(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .factory('BenchmarkService', BenchmarkService);

    BenchmarkService.$inject = ['$http', '$firebaseArray', 'appSetting'];

    function BenchmarkService($http, $firebaseArray, appSetting) {
        var refSectors = new Firebase(appSetting.baseUrl + 'Sectors/');
        var service = {
            initBenchmark: initBenchmark,
            getBenchmark: getBenchmark,
            getYear: getYear
        };
        return service;
        function getBenchmark(year) {
            var ref = new Firebase(appSetting.baseUrl + 'Benchmark/' + year);
            var list = $firebaseArray(ref);
            return list.$loaded();
        }
        function initBenchmark(year) {
            var ref = new Firebase(appSetting.baseUrl + 'Benchmark/' + year);
            var refYear = new Firebase(appSetting.baseUrl + 'Year/');
            var listYear = $firebaseArray(refYear);
            listYear.$add(year);
            var listBenchmark = $firebaseArray(ref);
            var listSectors = $firebaseArray(refSectors);
            listSectors.$loaded().then(function (data) {
                angular.forEach(data, function (value, key) {
                    listBenchmark.$add({ SectorId: value.$id, Code: value.Code, Name: value.Name, Mark: '20', Quantity: '200' });
                });
            });
        }
        function getYear() {
            var ref = new Firebase(appSetting.baseUrl + 'Year/');
            var listYear = $firebaseArray(ref);
            return listYear.$loaded();
        }
    }
})();