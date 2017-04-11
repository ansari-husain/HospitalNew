angular.module("hospitalNewApp")
  .factory('DataTable', function ($http, $q, base_url1) {

    var DataTable = {};
    //var base_url = 'http://www.jaliyaninfotech.com/hospital/hospital_service1.php?';
      var base_url = base_url1;
    DataTable.getStates = function(){
      var defer = $q.defer();
      $http.get(base_url+'get_states')
        .then(function(res){
          defer.resolve(res);
        },function(err){
        defer.resolve(err);
      });
      return defer.promise;
    };

    DataTable.getCities = function(state){
      var defer = $q.defer();
      $http.get(base_url+'get_cities'+(state ? '&state_code='+state : ''))
        .then(function(res){
          defer.resolve(res);

        },function(err){
          defer.reject(err);
        });
      return defer.promise;
    };

    DataTable.getPatientDetailAllArea = function(state,city){
      var defer = $q.defer();
      $http.get(base_url+'get_area_patient&state='+state+'&city='+city)
        .then(function(res){
          defer.resolve(res);
        },function(err){
          defer.reject(err)
        });
      return defer.promise;
    };

    DataTable.getHospitalId = function (hos_id) {
      var defer = $q.defer();
      $http.get(base_url + 'formf&hos_id='+hos_id)
        .then(function (response) {
          defer.resolve(response);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataTable.getFormF = function (hos_id) {
      var defer = $q.defer();
      $http.get(base_url + 'getHosDetail&hos_id=' + hos_id)
        .then(function (res) {
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataTable.getPatientDetail = function (p_id) {
      var defer = $q.defer();
      $http.get(base_url + 'getPatientDetail&unique_id=' + p_id)
        .then(function (res) {
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;

    };

    DataTable.getHosId = function () {
      var defer = $q.defer();
      $http({
        method:'GET',
        url: base_url + 'getHosId'

      })
        .then(function (res) {
          console.log('success');
          defer.resolve(res);
        },function(err){
          console.log('Error' , err);
          defer.resolve(err);
        });

      return defer.promise;
    };

    DataTable.getPatientTillDate = function(state,city){
      var defer = $q.defer();
      $http.get(base_url+'get_patient_details'+(state ? '&state='+state : '') + (city ? '&city='+city : ''))
        .then(function(res){
          defer.resolve(res)
        },function(err){
          defer.resolve(err);
        });
     return defer.promise;
    };
    return DataTable;
  });
