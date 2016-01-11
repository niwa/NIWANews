news
    .service('newsService', ['$http', 'newsModelService', function ($http, newsModelService) {

        return {
            getHeadlines: function () {
                var promise = new Promise(function (resolve, reject) {
                    $http({
                        method: 'GET',
                        url: newsModelService.get('headlinesUrl')
                    }).then(function successCallback(response) {

                        resolve(response.data.titles);

                    }, function errorCallback(response) {
                        reject(response);
                    });
                })
                return promise;
            },

            getNodes: function (headlines, callback) {

                var promise = new Promise(function (resolve,reject) {

                    var howManyNodesToShow = headlines.length <= 10 ? headlines.length : 10;
                    var counter = 1;
                    for (i = 0; i < howManyNodesToShow; i++) {
                        $http({
                            method: 'GET',
                            url: newsModelService.get('nodeUrl') + headlines[i].nid

                        }).then(function successCallback(response) {
                            node = {

                                'created': response.data.created,
                                'title': response.data.title,
                                'body': response.data.body,
                                'source': response.data.source
                            }
                            counter++;
                            callback(node);
                            if (counter >= howManyNodesToShow) {
                                resolve();
                            }

                        }, function errorCallback(response) {
                            reject(response);
                        })
                    }
                })
                return promise;
            }
        }
    }])