angular.module("hospitalNewApp")
  .factory('DataTable', function ($http, $q) {

    var DataTable = {};
    var base_url = 'http://www.jaliyaninfotech.com/hospital/hospital_service1.php?';

    DataTable.getStates = function(){
      var defer = $q.defer();
      $http.get(base_url+'get_states')
        .then(function(res){
          defer.resolve(res);
        },function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    DataTable.getCities = function(state){
      var defer = $q.defer();
      $http.get(base_url+'get_cities&state='+state)
        .then(function(res){
          defer.resolve(res);

        },function(err){
          defer.reject(err);
        });
      return defer.promise;
    };

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

    DataTable.getPatientTillDate = function(state,city){
      var defer = $q.defer();
      $http.get(base_url+'get_patient_details'+(state ? '&state='+state : '') + (city ? '&city='+city : ''))
        .then(function(res){
          defer.resolve(res)
        });
     return defer.promise;
    };
    return DataTable;
  });
