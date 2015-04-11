define(['app'], function (app) {
    app.controller('registrationController',
    [
        '$scope',
        'registrationService',
        function ($scope, service) {
            $scope.page =
            {
                title: 'Registration'
            }

            $scope.students = service.getList();
        }
    ]);
});