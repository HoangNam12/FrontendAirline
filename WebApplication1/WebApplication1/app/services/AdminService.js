(function () {
    'use strict';


    angular.module("myApp").service("AdminService", function ($http) {
        this.checkToken = function (token)
        {
           
                return $http({
                    method: "get",
                    url: "http://flightreservation-1.apphb.com/api/v1/session/checktoken",
                    params:{
                        token: token
                    }
                }).success(function (sur) {
                    return sur.data
                }).error(function () {

                });
           
        }
        this.GetChangBay = function (token)
        {
            return $http({
                headers:{
                    Token:token
                },
                method: "get",
                url: "http://flightreservation-1.apphb.com/api/v1/Flights/ChangBays",
            }).success(function (sur) {
                return sur.data
            });
        }
        this.deleteFlight = function (token,Id, Ngay, Hang, MucGia)
        {
            return $http({
                headers: {
                    Token: token
                },
                method: "delete",
                url: "http://flightreservation-1.apphb.com/api/v1/Flights/AbolitionFlight",
                params:
                    {
                        Id: Id,
                        Ngay: Ngay,
                        Hang: Hang,
                        MucGia:MucGia
                    }
            }).success(function (sur) {
                return sur.data
            });
        }

        this.updateFlight = function (token,idc, ngayc, hangc, mucgiac, id, noidi, noiden, ngay, gio, hang, mucgia, soluonghe, giaban) {
            return $http({
                headers: {
                    Token: token
                },
                method: "put",
                url: "http://flightreservation-1.apphb.com/api/v1/Flights/UpdateFlight",
                params:
                    {
                        IdC: idc,
                        NgayC: ngayc,
                        HangC: hangc,
                        MucGiaC:mucgiac,
                        Id: id,
                        NoiDi:noidi,
                        NoiDen:noiden,
                        Ngay:ngay,
                        Gio:gio,
                        Hang:hang,
                        MucGia:mucgia,
                        SoLuongGhe: soluonghe,
                        GiaBan:giaban
                    }
            }).success(function (sur) {
                return sur.data
            });
        }
        this.AddChangBay = function (token,noidi, noiden, ngay, gio, hang, mucgia, soluongghe, giaban)
        {
            return $http({
                headers: {
                    Token: token
                },
                method: "post",
                url: "http://flightreservation-1.apphb.com/api/v1/Flights/ThemChangBay",
                params:
                    {
                        noidi: noidi,
                        noiden: noiden,
                        ngay: ngay,
                        gio: gio,
                        hang: hang,
                        mucgia: mucgia,
                        soluong: soluongghe,
                        giaban: giaban
                    }
            }).success(function (result) {
                return result.data;
            });
        }
    });
})();