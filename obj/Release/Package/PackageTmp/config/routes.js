define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
				controller: 'controllers/homeController'
            },
            '/registration': {
                templateUrl: '/views/registration/list.html',
                controller: 'controllers/registrationController',
                dependencies: [
                    'services/registrationService'
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