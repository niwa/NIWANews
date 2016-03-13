describe('It should news', function () {
  var $compile, $rootscope, $scope;
  beforeEach(module('news', function ($provide, $controllerProvider) {
    $controllerProvider.register('newsController', function ($scope) {
      $scope.model = {
        headlineIds: [],
        nodeListRaw: [],
        nodeListSorted: []
      };
      var nodes = [
        {
          'created': '1447120695',
          'format': 'filtered_html',
          'nid': '1',
          'saveValue': 'savevalue1',
          'source': 'NIWA',
          'summary': 'all about testing1',
          'title': 'testing'
        },
        {
          'created': '1447120696',
          'format': 'filtered_html',
          'nid': '2',
          'saveValue': 'savevalue1',
          'source': 'NIWA',
          'summary': 'all about testing2',
          'title': 'testing'
        },
        {
          'created': '1447120697',
          'format': 'filtered_html',
          'nid': '3',
          'saveValue': 'savevalue1',
          'source': 'NIWA',
          'summary': 'all about testing3',
          'title': 'testing'
        }
      ];
      $scope.getLatestNodes = function () {
        $scope.model.nodeListSorted = nodes;
      };
    });
  }));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
  }));
  it('Checks that the message is displayed corrently', function () {
    // Compile a piece of HTML containing the directive
    var element = $compile('<latest-news></latest-news>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('Latest NIWA News');
    expect(element.html()).toContain('all about testing1');
    expect(element.html()).toContain('all about testing2');
    expect(element.html()).toContain('all about testing3');
  });
});