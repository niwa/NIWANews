describe('Controller: newsController broken', function () {
    var scope, newsService;
    var mockNodeIds = new Array('22,33,44,55,66');
    var mockNodeListSorted = new Array(
        {
            'created': '1447120695',
            'title': 'Jasmine tests1',
            'saveValue': '<p>Tests</p>',
            'summary': 'test summary1'


        },
        {
            'created': '1447120696',
            'title': 'Jasmine tests2',
            'saveValue': '<p>Tests</p>',
            'summary': 'test summary2'


        }
    )

    beforeEach(function () {

        var mockResponse = {};
        module('news', function ($provide) {
            $provide.value('newsService', mockResponse);
        })

        inject(function ($q) {


            mockResponse.getLatestNodeIds = function ($scope) {

                var defer = $q.defer();
                defer.reject(mockNodeIds);
                return defer.promise;
            }
            mockResponse.getNodes = function (mockNodeIds, $scope) {
                var defer = $q.defer();
                defer.reject(mockNodeListSorted);
                return defer.promise;
            }
        })
    })

    beforeEach(inject(function ($controller, $rootScope, _newsService_) {
        scope = $rootScope;
        newsService = _newsService_;
        controller = $controller('newsController', {$scope: scope, newsService: newsService});
        scope.getLatestNodes();
        scope.$digest();
    }));

    it('should set the correct values into the scope', function () {

        expect(scope.model.nodeListSorted).toEqual(false);
    })
})