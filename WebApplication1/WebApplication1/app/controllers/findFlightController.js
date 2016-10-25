(function () {
    'use strict';

    app.controller('findFlightController', findFlightController);

    findFlightController.$inject = ['$scope', '$location', '$http','$mdDialog', 'AngularServicesFindFlight'];

    function findFlightController($scope, $location, $http,$mdDialog, AngularServicesFindFlight) {
        var getData = AngularServicesFindFlight.GetSanBayDi();
        $scope.listSanBayDen = [];
        getData.success(function (sbd) {
            $scope.listSBD = JSON.parse(sbd);
        });
        $scope.getSanBayDen=function(IdSBD)
        {
            var getData = AngularServicesFindFlight.GetSanBayDen(IdSBD);
            getData.success(function (data) {
                $scope.listSanBayDen = JSON.parse(data);
                
            });
        }
        $scope.clickMotChieu = function()
        {
            $scope.visibleNgayVe = false;
        }
        $scope.clickKhuHoi = function () {
            $scope.visibleNgayVe = true;
        }
        $scope.findFlight = function()
        {
           
            
           
            if ($scope.visibleNgayVe == false)
            {
                var NgayDi = covertDateToString($scope.NgayDi);
                var getData = AngularServicesFindFlight.GetFlight($scope.SbDi.trim(), $scope.SbDen.trim(), $scope.SlNguoi, NgayDi, null);
            }
            else
            {
                var NgayDi = covertDateToString($scope.NgayDi);
                var NgayVe = covertDateToString($scope.NgayVe);
                var getData = AngularServicesFindFlight.GetFlight($scope.SbDi.trim(), $scope.SbDen.trim(), $scope.SlNguoi, NgayDi, NgayVe);
            }
            
            
            getData.success(function (data) { 
                if($scope.visibleNgayVe==false)
                {
                    $scope.dataJSON1 = JSON.parse(data);
                    $scope.chuyendiVisible = true;
                    $scope.chuyenveVisible = false;
                    if (JSON.parse(data).length <= 0) {
                        $scope.buttonBooking = false;
                    }
                    else {
                        $scope.buttonBooking = true;
                    }
                }
                else
                {
                    $scope.dataJSON1 = JSON.parse(data.ChuyenDi);
                    $scope.dataJSON2 = JSON.parse(data.ChuyenVe);
                    $scope.chuyendiVisible = true;
                    $scope.chuyenveVisible = true;
                    if (JSON.parse(data.ChuyenDi).length <= 0) {
                        $scope.buttonBooking = false;
                    }
                    else {
                        $scope.buttonBooking = true;
                    }
                }
            });
        }
        $scope.datCho=function(ev)
        {
            var listChuyenbay = [];
            var listHangs = [];
            var listMucGias = [];
            var listNgays = [];
            var numberPerson = $scope.SlNguoi;
            if ($scope.itemChuyenDi == undefined && $scope.itemChuyenVe == undefined)
            {
                $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Notify')
                              .textContent('Chưa chọn chuyến bay')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                              .targetEvent(ev));
            }
            if ($scope.visibleNgayVe == true)
            {
                listChuyenbay.push(JSON.parse($scope.itemChuyenDi).Id.replace("\"", "").trim());
                listChuyenbay.push(JSON.parse($scope.itemChuyenVe).Id.replace("\"", "").trim());
                listHangs.push(JSON.parse($scope.itemChuyenDi).Hang.replace("\"", "").trim());
                listHangs.push(JSON.parse($scope.itemChuyenVe).Hang.replace("\"", "").trim());
                listMucGias.push(JSON.parse($scope.itemChuyenDi).MucGia.replace("\"", "").trim());
                listMucGias.push(JSON.parse($scope.itemChuyenVe).MucGia.replace("\"", "").trim());
                listNgays.push(covertDateToString(new Date(JSON.parse($scope.itemChuyenDi).Ngay)));
                listNgays.push(covertDateToString(new Date(JSON.parse($scope.itemChuyenVe).Ngay)));
            }
            else
            {
                listChuyenbay.push(JSON.parse($scope.itemChuyenDi).Id.replace("\"","").trim());
                listHangs.push(JSON.parse($scope.itemChuyenDi).Hang.replace("\"", "").trim());
                listMucGias.push(JSON.parse($scope.itemChuyenDi).MucGia.replace("\"", "").trim());
                listNgays.push(covertDateToString(new Date(JSON.parse($scope.itemChuyenDi).Ngay)));
            }

            var getData=AngularServicesFindFlight.NewBooking(listChuyenbay, listHangs, listMucGias, listNgays, numberPerson);
            getData.success(function (data) {
                var tempS = "booking?id=" + data;
                $location.url(tempS);
            });
           
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