
var news = angular.module('news',[]);
;news.controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {

    $scope.model = {
        headlineIds: [],
        nodeListRaw: [],
        nodeListSorted: []
    };


    $scope.$watch('model.headlineIds', function (ids, oldids) {

        if ((typeof ids != 'undefined')&&(ids.length !== 0)) {
            newsService.getNodes(ids).then(function (nodes) {
                $scope.model.nodeListSorted = nodes;
            });
        }
    });

    $scope.getLatestNodes = function () {

        newsService.getLatestNodeIds().then(function (ids) {
            $scope.model.headlineIds = ids;

        },function(reason) {
            $scope.model.nodeListSorted = false;
        });

    };


}]);

;news.directive('latestNews', [function () {
    function link(scope, ele, attrs) {
        scope.getLatestNodes();
    }
    return {
        restrict: 'EA',
        link: link,
        template: '<div id="niwaNews" class="panel panel-primary col-md-4">' +
        '<div class="panel-heading">' +
        '<h1 class="panel-title">Latest NIWA News </h1>' +
        '</div>' +
        '<div ng-repeat="node in model.nodeListSorted" class="body">' +
        '<img width="100%" ng-show="$index==0" ng-src="{{node.nodeImage}}" />' +
        '<h3>{{node.title}}</h3>' +
        '<p>{{node.summary}}</p>' +
        '</div>' +
        '</div>' +
        '</div></div>',
        controller: 'newsController',
        scope: false
    };
}]);
;news.service('newsService', [
  '$http',
  '$q',
  'newsModelService',
  function ($http, $q, newsModelService) {
    return {
      getLatestNodeIds: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: newsModelService.get('headlinesUrl')
        }).then(function successCallback(response) {
          var nodelIstLength = response.data.titles.length;
          var nodeList = [];
          for (i = 0; i < nodelIstLength; i++) {
            nodeList.push(response.data.titles[i].nid);
          }
          deferred.resolve(nodeList);
        }, function errorCallback(response) {
          return 'http  error';
        });
        return deferred.promise;
      },
      getNodes: function (ids) {
        var compare = function (a, b) {
          return b.created - a.created;
        };
        var deferred = $q.defer();
        var howManyNodesToShow = ids.length <= 10 ? ids.length : 10;
        var counter = 1;
        var nodes = [];
        for (i = 0; i < howManyNodesToShow; i++) {
          $http({
            method: 'GET',
            url: newsModelService.get('nodeUrl') + ids[i]
          }).then(function successCallback(response) {
            node = {
              'nid': response.data.nid,
              'created': response.data.created,
              'title': response.data.title,
              'summary': response.data.body.und[0].summary,
              'value': response.data.body.und[0].value,
              'saveValue': response.data.body.und[0].safe_value,
              'format': response.data.body.und[0].format,
              'source': response.data.source,
              'nodeImage': newsModelService.get('imageBaseUrl') + response.data.field_forecast_article_image.und[0].filename
            };
            counter++;
            nodes.push(node);
            if (counter >= howManyNodesToShow) {
              deferred.resolve(nodes.sort(compare));
            }
          }, function errorCallback(response) {
            return 'http error';
          });
        }
        return deferred.promise;
      }
    };
  }
]);