news.controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {

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

