news
    .service('newsModelService', [function () {
        return {
            get: function (key) {

                var params = {};
                params.headlinesUrl = 'http://content.localhost/content/resource_list_by_type/forecast_article';
                params.nodeUrl = 'http://content.localhost/content/node/'; //+id
                params.nodesAmount = 10;
                if (typeof params[key] != 'undefined') {
                    return params[key];
                } else {
                    console.log('invalid parameter');
                }
            }
        }
    }])