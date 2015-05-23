﻿
define(['app'], function(app)
{
    app.service('supplierService', function ($http) {

          var api = {};
          var baseUrl = "http://api-easystich.rhcloud.com/suppliers/";
          //var baseUrl = "http://localhost:8062/suppliers/";
          var headers = {
              'Content-Type': 'application/json',
              'Accept': 'text/json'
          };

          //LIST
          api.getList = function (search, orderBy, pageNumber, pageSize) {
              var query = "";
              if (search != null && search != "") {
                  query = "q=" + search;
              }
              if (orderBy != null && orderBy != "") {
                  if (query != "") query += "&";
                  query += "o=" + orderBy;
              }
              if (pageNumber != null && pageNumber != "") {
                  if (query != "") query += "&";
                  query += "p=" + pageNumber;
              }
              if (pageSize != null && pageSize != "") {
                  if (query != "") query += "&";
                  query += "s=" + pageSize;
              }
              if (query != "") query = "?" + query;
              var req = {
                  method: 'GET',
                  url: baseUrl + query,
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