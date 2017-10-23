/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').config(function($routeProvider, $locationProvider) {
    
    function isLoggedIn($location, newLocation) {
        var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        if(loggedIn === true) {
            $location.path(newLocation);
        }
    }

    function isNotLoggedIn($location, newLocation) {
        var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        if(loggedIn === false) {
            $location.path(newLocation);
        }
    }

    $routeProvider
    .when('/', {
        resolve: {
            "check": function($location) {
                isLoggedIn($location, '/dashboard');
            }
        }, 
        templateUrl: 'partials/login.html', 
        controller: 'loginCtrl'
    })
    .when('/create', {
        resolve: {
            "check": function($location) {
                isLoggedIn($location, '/dashboard');
            }
        }, 
        templateUrl: 'partials/createAccount.html', 
        controller: 'createAccountCtrl'
    })
    .when('/dashboard', {
        resolve: {
            "check": function($location) {
                isNotLoggedIn($location, '/');
            }
        }, 
        templateUrl: 'partials/dashboard.html', 
        controller: 'dashboardCtrl'
    })
    .when('/categories', {
        resolve: {
            "check": function($location) {
                isNotLoggedIn($location, '/');
            }
        }, 
        templateUrl: 'partials/categories.html', 
        controller: 'categoriesCtrl'
    })
    .when('/categories/:id', {
        resolve: {
            "check": function($location) {
                isNotLoggedIn($location, '/');
            }
        }, 
        templateUrl: 'partials/categories.html',  // skal ændres til category.html
        controller: 'categoryCtrl'
    })
    /*.when('/user', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(!loggedIn) {
                    $location.path('/');
                }
            }
        }, 
        templateUrl: 'partials/user.html', 
        controller: 'userCtrl'
    })*/
    .when('/users/:id', {
        resolve: {
            "check": function($location) {
                isNotLoggedIn($location, '/');
            }
        }, 
        templateUrl: 'partials/user.html', 
        controller: 'userCtrl'
    })
    .when('/thread/:id', {
        resolve: {
            "check": function($location) {
                isNotLoggedIn($location, '/');
            }
        }, 
        templateUrl: 'partials/thread.html', 
        controller: 'threadCtrl'
    })
    .when('/404', {
        templateUrl: 'partials/404.html'
    })
    .otherwise({
        redirectTo: '/404'
    });
    $locationProvider.html5Mode(true);
});
