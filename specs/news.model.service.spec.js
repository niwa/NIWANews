"use_strict"
describe("get parameters", function () {
    var newsModelService;

    beforeEach(module("news"));

    beforeEach(inject(function (_newsModelService_) {
        newsModelService = _newsModelService_;

    }))

    it("should have the right values", function () {
            expect(newsModelService.get('headlinesUrl')).toEqual('http://content.localhost/content/resource_list_by_type/forecast_article');
            expect(newsModelService.get('nodeUrl')).toEqual('http://content.localhost/content/node/');
            expect(newsModelService.get('nodeUrlxyz')).toEqual('invalid parameter request');



    })
})