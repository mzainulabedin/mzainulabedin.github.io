define(['app'], function(app)
{
    app.controller('contactController',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                title: 'Contact Us'
            };
        }
    ]);
});