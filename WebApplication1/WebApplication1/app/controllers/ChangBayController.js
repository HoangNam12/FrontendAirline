(function () {
    'use strict';

    app.controller('ChangBayController', ChangBayController);

    ChangBayController.$inject = ['$scope', '$location', '$http','$mdDialog', 'AdminService'];

    function ChangBayController($scope, $location, $http,$mdDialog, AngularServicesFindFlight) {
        var data = AngularServicesFindFlight.GetChangBay();
        data.success(function (changbay) {
            $scope.dataChangBay = JSON.parse(changbay);
        });

        $scope.AddFormChangBay = function () {
            if ($scope.FromAddChangBay == true)
                $scope.FromAddChangBay = false;
            else
                $scope.FromAddChangBay = true;
        }

        $scope.AddChangBay = function (ev) {
            var getdata = AngularServicesFindFlight.AddChangBay($scope.noidi, $scope.noiden, $scope.ngaydi, $scope.gio, $scope.hang, $scope.mucgia, $scope.soluongghe, $scope.giaban)
            getdata.success(function (addchangbay) {
                $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Notify')
                              .textContent(JSON.parse(addchangbay))
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                              .targetEvent(ev));
                
                var data = AngularServicesFindFlight.GetChangBay();
                data.success(function (changbay) {              
                    $scope.dataChangBay = JSON.parse(changbay);
                });

                $scope.FromAddChangBay = false;
                $scope.noidi = "";
                $scope.noiden = "";
                $scope.ngaydi = "";
                $scope.gio = "";
                $scope.hang = "";
                $scope.mucgia = "";
                $scope.soluongghe = "";
                $scope.giaban = "";
            });
        }

    }
})();