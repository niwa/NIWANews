"use_strict"
describe("get parameters", function () {
    var newsModelService;

    beforeEach(module("news"));

    beforeEach(inject(function (_newsModelService_) {
        newsModelService = _newsModelService_;

    }))

    it("should have the right values", function () {
            expect(newsModelService.get('headlinesUrl')).toContain('/content/resource_list_by_type/forecast_article');
            expect(newsModelService.get('nodeUrl')).toContain('/content/node/');
            expect(newsModelService.get('nodeUrlxyz')).toEqual('invalid parameter request');



    })
})