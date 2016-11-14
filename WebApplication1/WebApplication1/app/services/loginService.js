(function () {
    'use strict';


    angular.module("myApp").service("AngularLoginService", function ($http) {
        
        this.Authenticate = function (autho) {
            return $http({
                method: "post",
                url: "http://localhost:33790/api/v1/Authenticate/Authenticate",
                headers: {
                    'Authorization':autho
                }
            }).success(function (sur) {
                return sur.data;
            }).error(function () {
                return "not login";
            });;
        }
        
        
    });
})();