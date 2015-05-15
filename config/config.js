'use strict';
require.config({
    baseUrl: '/',
    paths: {
		'angular': '/scripts/angular',
		'angular-route': '/scripts/angular-route',
		'ui-bootstrap': '/scripts/ui-bootstrap-tpls-0.13.0.min',
		'angular-animate': '/scripts/angular-animate.min',
		'data-utils': '/common/data-utils',
		'string-utils':'/common/string-utils',
        'app': '/config/app',
        'routes': '/config/routes'
    },
	shim: {
		'app': {
		    deps: ['angular', 'angular-route', 'ui-bootstrap', 'angular-animate', 'data-utils', 'string-utils']
		},
		'angular-route': {
			deps: ['angular']
		},
		'ui-bootstrap': {
		    deps: ['angular', 'angular-animate']
		},
		'angular-animate': {
		    deps: ['angular']
		}
	}
});

require
(
    ['app'],
    function(app)
    {
        angular.bootstrap(document, ['ngAnimate', 'ui.bootstrap', 'app']);
    }
);