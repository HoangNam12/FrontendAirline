(function () {
    'use strict';

    app.controller('InformationBookController', InformationBookController);

    InformationBookController.$inject = ['$scope', '$location', '$http','$mdDialog', 'AngularServicesInformationService'];

    function InformationBookController($scope, $location, $http,$mdDialog, AngularServicesInformationService) {
        var pathAddress = $location.search();
        var IdBook = pathAddress.id;
        if (IdBook == null || IdBook == undefined || IdBook == "")
        {
            $scope.choiceFlight = true;
            $scope.choiceBooking = false;
        }
        else {
            $scope.choiceFlight = false;
            $scope.choiceBooking = true;
        }
        AngularServicesInformationService.GetNumberPerson(IdBook).success(function (data) {
            var sl = parseInt(data);
            $scope.sl = sl;
            $scope.items = [];
            for (var i = 0; i < sl; i++) {
                var temp = {};
                temp.text = "22";
                $scope.items.push(temp);
            }

        });
        var getData = AngularServicesInformationService.GetFlightDetail(IdBook);
        getData.success(function (data) {
            $scope.listFlightDetail = JSON.parse(data);
            for(var i=0;i<$scope.listFlightDetail.length;i++)
            {
                $scope.listFlightDetail[i].SoLuong = $scope.sl.toString();
                $scope.listFlightDetail[i].TongGia = $scope.listFlightDetail[i].GiaBan* $scope.sl;
            }
        });
        $scope.xacNhan = function (ev) {
            var IdBooking=[];
            var Ho = [];
            var Ten = [];
            var DanhXung = [];
            for (var i = 0; i < $scope.items.length; i++) {
                Ten.push($scope.items[i].namePersonal);
                Ho.push($scope.items[i].preNamePersonal);
                DanhXung.push($scope.items[i].typePersonal);
                IdBooking.push(IdBook);
            }
            AngularServicesInformationService.UpdateState(IdBook).success(function (data) {
                $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Notify')
                      .textContent(data)
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                      .targetEvent(ev)
                  );
                if(data=="Success Translation")
                {
                    AngularServicesInformationService.NewPassengers(IdBooking, DanhXung, Ho, Ten).success(function (data) {
                        if (data == "Success") {
                            $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Success')
                              .textContent('Quá trình đặt chổ đã thành công')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                              .targetEvent(ev)
                          );
                        }
                        else {
                            $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Fail')
                              .textContent('Quá trình đặt chổ thaast bại')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                              .targetEvent(ev));
                        }
                    });
                }
                else {
                    return;
                }
            });
            

        }
    }
    
   
})();