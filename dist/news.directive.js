console.log(news);
news.directive('latestNews', [ function() {

    function link(scope, ele, attrs) {

        scope.getLatestNodes();

    }

    return {
        restrict: 'EA',
        link: link,
        template: '<div class="panel"><div class="panel-heading"><h3>Latest news </div><div ng-repeat="node in model.nodeList" class="body">{{node}}</div></div></div>',
        controller: 'newsController'
    }
}])