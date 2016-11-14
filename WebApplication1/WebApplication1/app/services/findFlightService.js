(function () {
    'use strict';


    angular.module("myApp").service("AngularServicesFindFlight", function ($http) {
        this.GetSanBayDi = function () {
            return $http({
                method: "get",
                url: "http://flightreservation-1.apphb.com/api/v1/Airports/sanbaydis",
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.GetSanBayDen = function (sbd) {
            return $http({
                method: "get",
                url: "http://flightreservation-1.apphb.com/api/v1/Airports/SanBayDens?sbd=" + sbd,
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.GetFlight = function (ChuyenBayDi,ChuyenBayDen, SlNguoi, NgayDi,NgayVe) {
            return $http({
                method: "get",
                url: "http://flightreservation-1.apphb.com/api/v1/Flights/Search?noidi=" + ChuyenBayDi + "&noiden=" + ChuyenBayDen + "&ngaydis=" + NgayDi + "&ngayves=" + NgayVe + "&soluong=" + SlNguoi,
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.NewBooking = function (IdFlights, Hangs, MucGias, Ngays, numberPerson) {
            return $http({
                method: "post",
                url: "http://flightreservation-1.apphb.com/api/v1/bookings/newbooking",
                params: {
                    IdFlights: IdFlights,
                    Hangs: Hangs,
                    MucGias: MucGias,
                    Ngays: Ngays,
                    numberPerson: numberPerson
                }

            }).success(function (result) {
                return result.data;
            });
        }
        

    });
})();