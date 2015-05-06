'use strict';
define([], function ()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
				controller: 'controllers/homeController'
            },
            '/item': {
                templateUrl: '/views/item/list.html',
                controller: 'controllers/itemController',
                dependencies: [
                    'services/itemService'
                ]
            },
            '/item/:id': {
                templateUrl: '/views/item/view.html',
                controller: 'controllers/itemController',
                dependencies: [
                    'services/itemService'
                ]
            },
            '/about/:person': {
                templateUrl: '/views/about.html',
                controller: 'controllers/aboutController'
            },
            '/contact': {
                templateUrl: '/views/contact.html',
                controller: 'controllers/contactController'
            }
        }
    };
});