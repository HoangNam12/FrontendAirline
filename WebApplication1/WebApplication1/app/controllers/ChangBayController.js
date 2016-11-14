(function () {
    'use strict';

    app.controller('ChangBayController', ChangBayController);

    ChangBayController.$inject = ['$scope', '$location', '$http','$mdDialog', 'AdminService','$cookieStore'];

    function ChangBayController($scope, $location, $http, $mdDialog, AdminService, $cookieStore) {
        var currentToken = $cookieStore.get('tokenFlight');
        if (currentToken == null || currentToken == undefined)
        {
            var confirm=$mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Notify')
                              .textContent('Login to manage flight')
                              .ariaLabel('Login to manage flight')
                              .ok('OK'));
            $mdDialog.show(confirm).then(function () {
                $location.path("/login");
            }, function () {
                $location.path("/login");
            });
        }
        var getData = AdminService.checkToken(currentToken);
        getData.success(function (data) {
        }).error(function () {
            var confirm = $mdDialog.confirm()
          .title('Notify')
          .textContent('Your session has timed out. Please login again.')
          .ariaLabel('Lucky day')
       
          .ok('Ok')
            ;

            $mdDialog.show(confirm).then(function () {
                $location.path("/login");
            });
        
            
        });
        GetChanBay();
        function GetChanBay()
        {
            var data = AdminService.GetChangBay(currentToken);
            data.success(function (changbay) {
                $scope.dataChangBay = JSON.parse(changbay);
            });
        }
        

        $scope.AddFormChangBay = function () {
            $scope.action = "add";
            if ($scope.FromAddChangBay == true)
                $scope.FromAddChangBay = false;
            else
                $scope.FromAddChangBay = true;
        }
        $scope.DeleteFlight=function(flight,ev)
        {
            var getdata = AdminService.deleteFlight(currentToken,flight.Id.trim(), covertDateToString(new Date(flight.Ngay.trim()))
                , flight.Hang.trim(), flight.MucGia.trim());
            getdata.success(function (data) {
                GetChanBay();
            }).error(function () {
                $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Notify')
                              .textContent('Có lỗi trong khi xóa')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                              .targetEvent(ev));
            });
        }
        $scope.UpdateFlight=function(flight)
        {
            
            $scope.action = "update";
            $scope.FromAddChangBay = true;
            $scope.noidi=flight.NoiDi.trim();
            $scope.noiden = flight.NoiDen.trim();
            $scope.ngaydi=new Date(flight.Ngay);
            $scope.gio=flight.Gio;
            $scope.hang = flight.Hang.trim();
            $scope.mucgia = flight.MucGia.trim();
            $scope.soluongghe=flight.SoLuongGhe;
            $scope.giaban = flight.GiaBan;
            $scope.idFlightTemp = flight.Id;
            $scope.ngaydic = new Date(flight.Ngay);
            $scope.hangc = flight.Hang;
            $scope.mucgiac = flight.MucGia;
            
        }
        $scope.AddChangBay = function (ev) {
            if ($scope.action=="add")
            {
                var getdata = AdminService.AddChangBay(currentToken,$scope.noidi, $scope.noiden,
                $scope.ngaydi, $scope.gio, $scope.hang, $scope.mucgia, $scope.soluongghe, $scope.giaban)
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

                    var data = AdminService.GetChangBay();
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
            else
            {
                var flight = {};
                flight.NoiDi=$scope.noidi;
                flight.NoiDen=$scope.noiden;
                flight.Ngay=$scope.ngaydi;
                flight.Gio=$scope.gio;
                flight.Hang=$scope.hang;
                flight.MucGia = $scope.mucgia;
                flight.SoLuongGhe=$scope.soluongghe;
                flight.GiaBan=$scope.giaban;
                var getdata = AdminService.updateFlight(currentToken,$scope.idFlightTemp, covertDateToString($scope.ngaydic),
                    $scope.hangc,$scope.mucgiac, $scope.idFlightTemp, $scope.noidi,
                    $scope.noiden, covertDateToString($scope.ngaydi), $scope.gio, $scope.hang, $scope.mucgia,
                    $scope.soluongghe, $scope.giaban);
                getdata.success(function (data) {
                    $scope.FromAddChangBay = false;
                    GetChanBay();
                });
            }
            
        }

    }
    function covertDateToString(dateSrc) {
        var day = dateSrc.getDate();
        var month = dateSrc.getMonth() + 1;
        var year = dateSrc.getYear() + 1900;
        var date = month + "/" + day + "/" + year;
        return date;
    }
})();