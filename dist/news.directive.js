news.directive('latestNews', [function () {
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
