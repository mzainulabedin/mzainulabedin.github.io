
define(['app'], function(app)
{
    app.service('registrationService', function ($http) {

          var api = {};

          api.getList = function() {
              var students = [
                  { id: 1, name: 'Ali' },
                  { id: 2, name: 'Ahmed' },
                  { id: 3, name: 'Samia' },
                  { id: 4, name: 'Bilal' },
                  { id: 5, name: 'Kashif' }
              ];
              return students;
          }
          return api;
      });
});