'use strict';
require.config({
    baseUrl: '/',
    paths: {
		'angular': '/scripts/angular',
		'angular-route': '/scripts/angular-route',
		'ui-bootstrap': '/scripts/ui-bootstrap-tpls-0.13.0.min',
		'angular-animate': '/scripts/angular-animate.min',

		'chart': '/scripts/chart',
		'angular-chart': '/scripts/angular-chart',
		
		'data-utils': '/common/data-utils',
		'string-utils': '/common/string-utils',
		'global': '/common/global',

        'app': '/config/app',
        'routes': '/config/routes'
        
    },
	shim: {
		'app': {
		    deps: ['angular', 'angular-route', 'ui-bootstrap', 'global', 'data-utils', 'string-utils', 'angular-chart']
		},
		
		'angular-route': {
			deps: ['angular']
		},
		'ui-bootstrap': {
		    deps: ['angular', 'angular-animate']
		},
		'angular-animate': {
		    deps: ['angular']
		},
		'angular-chart': {
		    deps: ['angular', 'chart']
		}
	}
});

require
(
    ['app'],
    function(app)
    {
        angular.bootstrap(document, ['ngAnimate', 'ui.bootstrap', 'chart.js', 'app']);
    }
);