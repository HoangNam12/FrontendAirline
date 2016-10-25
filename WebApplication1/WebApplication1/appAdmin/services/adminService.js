(function () {
    'use strict';

    angular
        .module('myAppAdmin')
        .factory('AdminService', AdminService);

    AdminService.$inject = ['$http', '$firebaseObject', '$firebaseArray', 'appSetting'];

    function AdminService($http, $firebaseObject, $firebaseArray, appSetting) {
        var refSectors = new Firebase(appSetting.baseUrl + 'Sectors/');
        var service = {
            editBenchmark: editBenchmark,
            addSector: addSector,
            deleteSector: deleteSector,
            saveSector: saveSector,
            getSector: getSector
        };
        return service;
        function editBenchmark(year, benchmark) {
            var ref = new Firebase(appSetting.baseUrl + 'Benchmark/' + year + '/' + benchmark.$id);
            var obj = $firebaseObject(ref);
            obj.Code = benchmark.Code;
            obj.Name = benchmark.Name;
            obj.Mark = benchmark.Mark;
            obj.Quantity = benchmark.Quantity;
            obj.$save();
            var refArray = new Firebase(appSetting.baseUrl + 'Benchmark/' + year);
            return $firebaseArray(refArray).$loaded();
        }
        function addSector(newsector) {
            var refArray = new Firebase(appSetting.baseUrl + 'Sectors/');
            var list = $firebaseArray(refArray);
            list.$add({ Code: newsector.Code, Name: newsector.Name });
            return list.$loaded();
        }
        function getSector() {
            var ref = new Firebase(appSetting.baseUrl + 'Sectors/');
            var list = $firebaseArray(ref);
            return list.$loaded();
        }
        function deleteSector(sector) {
            var ref = new Firebase(appSetting.baseUrl + 'Sectors/' + sector.$id);
            var obj = $firebaseObject(ref);
            obj.$remove();
            return $firebaseArray(refSectors).$loaded();
        }
        function saveSector(sector) {
            var ref = new Firebase(appSetting.baseUrl + 'Sectors/' + sector.$id);
            var obj = $firebaseObject(ref);
            obj.Code = sector.Code;
            obj.Name = sector.Name;
            obj.$save();
            return $firebaseArray(refSectors).$loaded();
        }
    }
})();