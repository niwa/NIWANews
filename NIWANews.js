
var news = angular.module('news',[]);
;news.controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {

    $scope.news={
        model: {
            headlineIds: [],
            nodeListRaw: [],
            nodeListSorted: []
        }
    };


    $scope.$watch('news.model.headlineIds', function (ids, oldids) {

        if ((typeof ids != 'undefined')&&(ids.length !== 0)) {
            newsService.getNodes(ids).then(function (nodes) {
                $scope.news.model.nodeListSorted = nodes;
            });
        }
    });

    $scope.getLatestNodes = function () {

        newsService.getLatestNodeIds().then(function (ids) {
            $scope.news.model.headlineIds = ids;

        },function(reason) {
            $scope.news.model.nodeListSorted = false;
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
        template: '<div id="niwaNews" class="panel panel-primary">' +
        '<div class="panel-heading">' +
        '<h1 class="panel-title">Latest NIWA News </h1>' +
        '</div>' +
        '<div ng-repeat="node in news.model.nodeListSorted" class="body">' +
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
;news
    .service('newsModelService', [function () {
        return {
            get: function (key) {

                var params = {};
                params.contentType = 'forecast_article';
                params.imageBaseUrl = 'http://content-test.niwa.co.nz/sites/default/files/';
                params.headlinesUrl = 'http://content-test.niwa.co.nz/content/resource_list_by_type/'+params.contentType;
                params.nodeUrl = 'http://content-test.niwa.co.nz/content/node/'; //+id
                params.nodesAmount = 10;
                if (typeof params[key] != 'undefined') {
                    return params[key];
                } else {
                    return 'invalid parameter request';
                }
            }
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
        var howManyNodesToShow = ids.length <= 1 ? ids.length : 1;
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