news.controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {

    $scope.model = {
        headlineIds: [],
        nodeListRaw: [],
        nodeListSorted: []
    }


    $scope.$watch('model.headlineIds', function (ids, oldids) {

        if ((typeof ids != 'undefined')&&(ids.length != 0)) {
            newsService.getNodes(ids).then(function (nodes) {
                $scope.model.nodeListSorted = nodes;
            });
        }
    })

    $scope.getLatestNodes = function () {

        newsService.getLatestNodeIds().then(function (ids) {
            $scope.model.headlineIds = ids;

        },function(reason) {
            $scope.model.nodeListSorted = false;
        });

    }


}])