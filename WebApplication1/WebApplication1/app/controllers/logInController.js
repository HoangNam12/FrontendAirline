(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$location', 'localStorageService', '$scope', '$mdDialog', 'AuthenticationService', 'AngularLoginService', '$cookieStore'];

    function LogInController($location, localStorageService, $scope, $mdDialog, AuthenticationService, AngularLoginService, $cookieStore) {
        $scope.logIn=function(ev)
        {
            var autho = AuthenticationService.SetCredentials($scope.Username, $scope.Password);
            var getdata = AngularLoginService.Authenticate(autho);
            getdata.success(function (data,result,header,config) {
                var tempToken = header()['token'];
                $cookieStore.put('tokenFlight', tempToken);
                $location.path("/changbay");
            }).error(function (error) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Notify')
                    .textContent('Sai username hoặc password')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                    .targetEvent(ev));
            });
            //if ($scope.Username == "admin" && $scope.Password == "admin") {
            //    $location.path("/changbay");
            //}
            //else {
            //    $mdDialog.show(
            //   $mdDialog.alert()
            //     .parent(angular.element(document.querySelector('#popupContainer')))
            //     .clickOutsideToClose(true)
            //     .title('Notify')
            //     .textContent('Sai username hoặc password')
            //     .ariaLabel('Alert Dialog Demo')
            //     .ok('OK')
            //     .targetEvent(ev));
            //}

        }
        
    }
})();