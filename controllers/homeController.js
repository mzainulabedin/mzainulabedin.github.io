define(['app'], function(app)
{
	app.controller('homeController',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                title: 'Welcome'
            };
        }
    ]);
});