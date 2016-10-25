(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$location', 'AdminService', 'BenchmarkService'];

    function AdminController($location, AdminService, BenchmarkService) {
        var vm = this;
        vm.years = [];
        vm.selectedYear = null;
        vm.Update = function () {
            BenchmarkService.getBenchmark(vm.selectedYear).then(function (data) {
                vm.listBenchmark = data;
            });
        };
        vm.saveChange = function (benchmark) {
            AdminService.editBenchmark(vm.selectedYear, benchmark).then(function (data) {
                vm.listBenchmark = data;
            });
        };
        vm.addYear = function () {
            BenchmarkService.initBenchmark(vm.years[vm.years.length - 1] + 1);
            activate();
        };
        vm.addSector = function () {
            AdminService.addSector(vm.newsector).then(function (data) {
                vm.listSector = data;
            });
            vm.newsector.Code = "";
            vm.newsector.Name = "";
        };
        vm.deleteSector = function (sector) {
            AdminService.deleteSector(sector).then(function (data) {
                vm.listSector = data;
            });
        };
        vm.saveSector = function (sector) {
            AdminService.saveSector(sector).then(function (data) {
                vm.listSector = data;
            });
        };
        activate();

        function getBenchmark(year) {
            BenchmarkService.getBenchmark(year).then(function (data) {
                vm.listBenchmark = data;
            });
        }

        function activate() {
            vm.years = [];
            BenchmarkService.getYear().then(function (data) {
                angular.forEach(data, function (value) {
                    vm.years.push(value.$value);
                });
                vm.selectedYear = vm.years[vm.years.length - 1];
            });
            getBenchmark(2015);
            AdminService.getSector().then(function (data) {
                vm.listSector = data;
            });
        }
    }
})();