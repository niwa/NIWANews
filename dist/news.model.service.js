news
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
                    return 'invalid parameter request'
                }
            }
        }
    }])