﻿(function () {
    'use strict';


    angular.module("myApp").service("AngularServicesInformationService", function ($http) {
        this.GetNumberPerson = function (IdBooking) {
            return $http({
                method: "get",
                url: "http://localhost:33790/Bookings/GetNumberPassenger?IdBooking="+IdBooking,
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.GetNumberPerson = function (IdBooking) {
            return $http({
                method: "get",
                url: "http://localhost:33790/Bookings/GetNumberPassenger?IdBooking=" + IdBooking,
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.GetFlightDetail=function(IdBooking)
        {
            
            return $http({
                method: "get",
                url: "http://localhost:33790/Bookings/DetailFlightBooking?IdBooking=" + IdBooking,
            }).success(function (sur) {
                return sur.data;
            });
        }
        this.UpdateState=function(IdBooking)
        {
            return $http({
                method: "GET",
                url: "http://localhost:33790/Bookings/Confirm",
                params: {
                    IdBooking: IdBooking,
                    StateBooking: 1,

                },
               
            }).success(function (result) {
                return result.data;
            });
        }
        this.NewPassengers = function (IdBooking, DanhXung, Ho, Ten) {
            return $http({
                method: "post",
                url: "http://localhost:33790/Passengers/NewPassengers",
                params: {
                    IdBooking: IdBooking,
                    DanhXung: DanhXung,
                    Ho: Ho,
                    Ten: Ten,
                    
                }

            }).success(function (result) {
                return result.data;
            });
        }
    });
})();