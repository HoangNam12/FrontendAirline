(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$location', 'localStorageService', 'AuthService', '$scope'];

    function LogInController($location, localStorageService, AuthService, $scope) {
        var vm = this;
        vm.existedEmail = false;
        vm.logIn = function () {
            AuthService.logIn(vm.newuser, function (error, authData) {
                if (error) {
                    alert('Login Failed!');
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    localStorageService.set('accesstoken', authData.token);
                    $location.path("/home");
                    $scope.$apply();
                }
            });
        };
        vm.registerUser = function () {
            AuthService.register(vm.newregister, function (error, authData) {
                if (error) {
                    if (error.code === 'EMAIL_TAKEN') {
                        vm.existedEmail = true;
                        $scope.$apply();
                    }
                    console.log("Register Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $location.path("/login");
                    $scope.$apply();
                }
            });
        };

    }
})();