'use_strict';
describe('get news', function () {
  var newsService, newsModelService, httpBackend;
  var testResponse = '{"titles":[{"title":"The see-sawing climate system","created":"1447120695","nid":"227"},{"title":"The see-sawing climate system","created":"1447120696","nid":"226"}]}';
  var testReponseNode = '{"vid":"233","uid":"121","title":"The see-sawing climate system","log":"","status":"1","comment":"2"' + ',"promote":"1","sticky":"0","vuuid":"91b8c98f-43b7-488d-9198-be2c0e8029fd","nid":"227","type":"forecast_article"' + ',"language":"und","created":"1447120695","changed":"1447120695","tnid":"0","translate":"0","uuid":"8883b46e-9988-4646-8ac8-49129236c392"' + ',"revision_timestamp":"1447120695","revision_uid":"121","body":{"und":[{"value":"test!Value"}]},"summary" :"New Zealand scientists are part of an international team that has documented duelling ocean and atmospheric    heat transport during periods of abrupt climate change.","field_forecast_article_image"' + '  :{"und":[{"fid":"435","uid":"121","filename":"NZ_tarns.jpg","uri":"public://NZ_tarns.jpg","filemime"' + '  :"image/jpeg","filesize":"137970","status":"1","timestamp":"1447120695","uuid":"0d5d96bc-9ec8-4a02-8ee1-7d2a90de87b8"' + '  ,"rdf_mapping":[],"alt":"","title":"","width":"900","height":"500"}]},"field_source":{"und":[{"value"' + '  :"NIWA","format":null,"safe_value":"NIWA"}]},"field_forecast_article_tags":{"und":[{"tid":"1"},{"tid"' + '  :"22"}]},"field_inline_images":[],"rdf_mapping":{"rdftype":["sioc:Item","foaf:Document"],"title":{"predicates"' + '  :["dc:title"]},"created":{"predicates":["dc:date","dc:created"],"datatype":"xsd:dateTime","callback"' + '  :"date_iso8601"},"changed":{"predicates":["dc:modified"],"datatype":"xsd:dateTime","callback":"date_iso8601"' + '  },"body":{"predicates":["content:encoded"]},"uid":{"predicates":["sioc:has_creator"],"type":"rel"},"name"' + '  :{"predicates":["foaf:name"]},"comment_count":{"predicates":["sioc:num_replies"],"datatype":"xsd:integer"' + '  },"last_activity":{"predicates":["sioc:last_activity_date"],"datatype":"xsd:dateTime","callback":"date_iso8601"' + '  }},"cid":"0","last_comment_timestamp":"1447120695","last_comment_name":null,"last_comment_uid":"121"' + ',"comment_count":"0","name":"Colin","picture":"0","data":"b:0;","path":"http://content.localhost/node' + '  /227"}';
  var testReponseNode2 = '{"vid":"233","uid":"121","title":"The see-sawing climate system","log":"","status":"1","comment":"2"' + ',"promote":"1","sticky":"0","vuuid":"91b8c98f-43b7-488d-9198-be2c0e8029fd","nid":"227","type":"forecast_article"' + ',"language":"und","created":"1447120695","changed":"1447120695","tnid":"0","translate":"0","uuid":"8883b46e-9988-4646-8ac8-49129236c392"' + ',"revision_timestamp":"1447120695","revision_uid":"121","body":{"und":[{"value":"test!Value"}]},"summary" :"New Zealand scientists are part of an international team that has documented duelling ocean and atmospheric    heat transport during periods of abrupt climate change.","field_forecast_article_image"' + '  :{"und":[{"fid":"435","uid":"121","filename":"NZ_tarns.jpg","uri":"public://NZ_tarns.jpg","filemime"' + '  :"image/jpeg","filesize":"137970","status":"1","timestamp":"1447120695","uuid":"0d5d96bc-9ec8-4a02-8ee1-7d2a90de87b8"' + '  ,"rdf_mapping":[],"alt":"","title":"","width":"900","height":"500"}]},"field_source":{"und":[{"value"' + '  :"NIWA","format":null,"safe_value":"NIWA"}]},"field_forecast_article_tags":{"und":[{"tid":"1"},{"tid"' + '  :"22"}]},"field_inline_images":[],"rdf_mapping":{"rdftype":["sioc:Item","foaf:Document"],"title":{"predicates"' + '  :["dc:title"]},"created":{"predicates":["dc:date","dc:created"],"datatype":"xsd:dateTime","callback"' + '  :"date_iso8601"},"changed":{"predicates":["dc:modified"],"datatype":"xsd:dateTime","callback":"date_iso8601"' + '  },"body":{"predicates":["content:encoded"]},"uid":{"predicates":["sioc:has_creator"],"type":"rel"},"name"' + '  :{"predicates":["foaf:name"]},"comment_count":{"predicates":["sioc:num_replies"],"datatype":"xsd:integer"' + '  },"last_activity":{"predicates":["sioc:last_activity_date"],"datatype":"xsd:dateTime","callback":"date_iso8601"' + '  }},"cid":"0","last_comment_timestamp":"1447120695","last_comment_name":null,"last_comment_uid":"121"' + ',"comment_count":"0","name":"Colin","picture":"0","data":"b:0;","path":"http://content.localhost/node' + '  /227"}';
  beforeEach(module('news'));
  beforeEach(inject(function (_newsService_, newsModelService, $httpBackend) {
    newsService = _newsService_;
    newsModelService = newsModelService;
    httpBackend = $httpBackend;
    httpBackend.whenGET(newsModelService.get('headlinesUrl')).respond(function (method, url, data) {
      return [
        200,
        testResponse
      ];
    });
    var exptUrl = newsModelService.get('nodeUrl') + '227';
    httpBackend.whenGET(exptUrl).respond(function (method, url, data) {
      return [
        200,
        testReponseNode
      ];
    });
    exptUrl = newsModelService.get('nodeUrl') + '226';
    httpBackend.whenGET(exptUrl).respond(function (method, url, data) {
      console.log(url);
      return [
        200,
        testReponseNode2
      ];
    });
  }));
  it('should have the right nodes', function () {
    newsService.getLatestNodeIds().then(function (ids) {
      expect(ids).toEqual([
        '227',
        '226'
      ]);
    });
    var ids = new Array(0);
    ids.push(226);
    ids.push(227);
    newsService.getNodes(ids).then(function (nodes) {
      console.log('XXXXXXX');
      console.log(nodes);
      expect(nodes[0].nid).toEqual('227');
      expect(nodes[0].title).toEqual('The see-sawing climate system');
    });
    httpBackend.flush();
  });
});