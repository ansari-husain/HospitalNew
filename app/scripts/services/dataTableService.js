angular.module("hospitalNewApp")
  .factory('DataTable', function ($http, $q) {

    var DataTable = {};
    var base_url = 'http://www.jaliyaninfotech.com/hospital/hospital_service1.php?';

    DataTable.getHospitalId = function (hos_id) {
      var defer = $q.defer();
      $http.get(base_url + 'formf&hos_id='+hos_id)
        .then(function (response) {
          defer.resolve(response);
        });
      return defer.promise;
    };

    DataTable.getFormF = function (hos_id) {
      var defer = $q.defer();
      $http.get(base_url + 'getHosDetail&hos_id=' + hos_id)
        .then(function (res) {
          defer.resolve(res);
        });
      return defer.promise;
    };

    DataTable.getPatientDetail = function (p_id) {
      var defer = $q.defer();
      $http.get(base_url + 'getPatientDetail&unique_id=' + p_id)
        .then(function (res) {
          defer.resolve(res);
        });
      return defer.promise;

    };

    DataTable.getHosId = function () {
      var defer = $q.defer();
      $http.get(base_url + 'getHosId')
        .then(function (res) {
          defer.resolve(res);
        });

      return defer.promise;
    };

    DataTable.getPatientTillDate = function(){
      var defer = $q.defer();
      $http.get(base_url+'get_patient_details')
        .then(function(res){
          defer.resolve(res)
        });
     return defer.promise;
    };
    return DataTable;
  });
