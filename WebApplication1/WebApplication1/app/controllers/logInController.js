(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$location', 'localStorageService',  '$scope', '$mdDialog'];

    function LogInController($location, localStorageService, $scope, $mdDialog) {
        $scope.logIn=function(ev)
        {
            if ($scope.Username == "admin" && $scope.Password == "admin") {
                $location.path("/changbay");
            }
            else {
                $mdDialog.show(
               $mdDialog.alert()
                 .parent(angular.element(document.querySelector('#popupContainer')))
                 .clickOutsideToClose(true)
                 .title('Notify')
                 .textContent('Sai username hoặc password')
                 .ariaLabel('Alert Dialog Demo')
                 .ok('OK')
                 .targetEvent(ev));
            }

        }
        
    }
})();