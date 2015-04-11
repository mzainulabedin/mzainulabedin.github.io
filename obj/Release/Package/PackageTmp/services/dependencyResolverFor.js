define([], function () {
    return function (controller, dependencies) {
        var definition = {
            resolver: ['$q', '$rootScope', function ($q, $rootScope) {
                var deferred = $q.defer();
                if (controller) {
                    if (!dependencies)
                        dependencies = [];
                    dependencies.push(controller);
                }
                require(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }]
        }
        return definition;
    }
});