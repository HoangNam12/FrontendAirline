var app = angular.module("myApp", ['ngMaterial', 'ui.router', 'firebase', 'LocalStorageModule', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    //$routeProvider
    //    .when('/', {
    //        templateUrl: 'app/views/home.html',
    //        controller: 'SectorController',
    //        controllerAs: 'vm'
    //    })
    //    .when('/create', {
    //        templateUrl: 'app/views/create.html',
    //        controller: 'SectorController',
    //        controllerAs: 'vm'
    //    })
    //    .when('/edit/:id', {
    //        templateUrl: 'app/views/edit.html',
    //        controller: 'SectorController',
    //        controllerAs: 'vm'
    //    })
    //    .when('/benchmark', {
    //        templateUrl: 'app/views/benchmark.html',
    //        controller: 'BenchmarkController',
    //        controllerAs: 'vm'
    //    });
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'app/views/home.html',
            controller: 'SectorController',
            controllerAs: 'vm'
        })
        .state('booking', {
            url: '/booking',
            templateUrl: 'app/views/InformationBook.html',
            controller: 'InformationBookController',
            controllerAs: 'vm'
        })
        .state('changbay', {
            url: '/changbay',
            templateUrl: 'app/views/changbay.html',
            controller: 'ChangBayController',
            controllerAs: 'vm'
        })
        .state('findflight', {
            url: '/findflight',
            templateUrl: 'app/views/findflight.html',
            controller: 'findFlightController',
            controllerAs: 'vm'
        })

       

        .state('admin', {
            url: '/admin',
            templateUrl: 'app/views/admin.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        })

        .state('admin1', {
            url: '/admin1',
            templateUrl: 'app/views/admin_Sector.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'app/views/logIn.html',
            controller: 'LogInController',
            controllerAs: 'vm'
        })

      
});

app.constant('appSetting', {
    baseUrl: 'https://my-app-20-04-95.firebaseio.com/',
    groupA: 'Toán-Lý-Hóa',
    groupA1: 'Toán-Lý-Tiếng Anh',
    groupB: 'Toán-Sinh-Hóa'
});
app.factory('httpInterceptor', function ($q, $rootScope, $log) {
    return {
        request: function (config) {
            return config || $q.when(config)
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (response) {
            if (response.status === 401) {
                //here I preserve login page 
                
                $rootScope.$broadcast('error')
            }
            if (response.status === 500) {
                //here I preserve login page 

                $rootScope.$broadcast('error')
            }
            return $q.reject(response);
        }
    };
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});