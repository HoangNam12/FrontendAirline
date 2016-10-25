(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$firebaseObject', '$firebaseArray', 'localStorageService', 'appSetting'];

    function AuthService($http, $firebaseObject, $firebaseArray, localStorageService, appSetting) {
        var ref = new Firebase(appSetting.baseUrl);
        var service = {
            auth: auth,
            logIn: logIn,
            register: register
        };
        return service;
        function auth() {
            if (localStorageService.get('accesstoken') == null) {
                $location.path("/user");
            }
            ref.auth(localStorageService.get('accesstoken'), function (error, result) {
                if (error) {
                    console.log("Authentication Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", result.auth);
                    console.log("Auth expires at:", new Date(result.expires * 1000));
                }
            });
        }
        function logIn(newuser, callback) {
            ref.authWithPassword({
                email: newuser.Username,
                password: newuser.Password
            }, callback);
        }
        function register(newregister, callback) {
            ref.createUser({
                email: newregister.Username,
                password: newregister.Password
            }, callback);
        }
    }
})();