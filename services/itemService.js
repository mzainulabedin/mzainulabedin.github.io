
define(['app'], function(app)
{
    app.service('itemService', function ($http) {

          var api = {};
          var baseUrl = "http://api-easystich.rhcloud.com/items/";
          var headers = {
              'Content-Type': 'application/json',
              'Accept': 'text/json'
          };

          //LIST
          api.getList = function() {
              var req = {
                  method: 'GET',
                  url: baseUrl,
                  headers: headers
              }
              return $http(req);
          }

          //GET
          api.get = function (id) {
              var req = {
                  method: 'GET',
                  url: baseUrl + id,
                  headers: headers
              }
              return $http(req);
          }

          //UPDATE
          api.update = function (id, item) {
              var req = {
                  method: 'PUT',
                  url: baseUrl + id,
                  headers: headers,
                  data: item
              }
              return $http(req);
          }

          //INSERT
          api.insert = function (item) {
              var req = {
                  method: 'POST',
                  url: baseUrl,
                  headers: headers,
                  data: item
              }
              return $http(req);
          }

          //DELETE
          api.delete = function (id, item) {
              var req = {
                  method: 'DELETE',
                  url: baseUrl + id,
                  headers: headers,
                  data: item
              }
              return $http(req);
          }


          return api;
      });
});