require.config({
    baseUrl: '/',
    paths: {
		'angular': '/scripts/angular',
		'angular-route': '/scripts/angular-route',
		'bootstrap': '/scripts/bootstrap.min',
		'jquery': '/scripts/jquery-2.1.3',
        'app': '/config/app',
        'routes': '/config/routes'
    },
	shim: {
		'app': {
			deps: ['angular', 'angular-route', 'bootstrap']
		},
		'angular-route': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);