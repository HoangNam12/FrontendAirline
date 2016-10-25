var app = angular.module("myAppAdmin", ['ui.router', 'firebase', 'LocalStorageModule']);

app.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'appAdmin/views/benchmark.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        })

        .state('benchmark', {
            url: '/benchmark',
            templateUrl: 'appAdmin/views/benchmark.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        })

        .state('sector', {
            url: '/sector',
            templateUrl: 'appAdmin/views/sector.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'appAdmin/views/logIn.html',
            controller: 'LogInController',
            controllerAs: 'vm'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'appAdmin/views/register.html',
            controller: 'LogInController',
            controllerAs: 'vm'
        });
});

app.constant('appSetting', {
    baseUrl: 'https://my-app-20-04-95.firebaseio.com/',
});