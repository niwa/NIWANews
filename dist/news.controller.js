news.controller('newsController', ['$scope', 'newsService', 'newsModelService', function ($scope, newsService, newsModelService) {

    $scope.model = {
        headlines: {},
        nodeListRaw: [],
        nodeListSorted: []
    }

    var updateNodeList = function (node) {
        $scope.model.nodeListRaw.push(node);
    }
    var compare = function (a,b) {
        return b.created - a.created;
    }
    $scope.getNodes = function (headlines) {
        console.log('start');
        newsService.getNodes(headlines,updateNodeList).then (function() {
            console.log('done');

            $scope.model.nodeListSorted = $scope.model.nodeListRaw.sort(compare);
            console.log($scope.model.nodeListSorted);
        });
    }


    $scope.getLatestNodes = function () {
        newsService.getHeadlines().then(function (headlines) {
            $scope.getNodes(headlines);
    })
    }
}])
