(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .controller('BenchmarkController', BenchmarkController);

    BenchmarkController.$inject = ['$location', 'BenchmarkService'];

    function BenchmarkController($location, BenchmarkService) {
        var vm = this;
        vm.years = [];
        vm.selectedYear = null;
        activate();
        vm.Update = function () {
            BenchmarkService.getBenchmark(vm.selectedYear).then(function (data) {
                vm.listBenchmark = data;
            });
        };
        function activate() {
            BenchmarkService.getYear().then(function (data) {
                angular.forEach(data, function (value) {
                    vm.years.push(value.$value);
                });
                vm.selectedYear = vm.years[vm.years.length - 1];
            });
            BenchmarkService.getBenchmark(2015).then(function (data) {
                vm.listBenchmark = data;
            });
        }
    }
})();