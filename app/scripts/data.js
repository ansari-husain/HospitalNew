angular.module("hospitalNewApp")
  .controller('userController', function ($scope, $http, DataTable) {

    $scope.select = function () {
      DataTable.getHospitalId($scope.ms)
        .then(function (res) {
          $scope.result = res.data.FormF;
        });
    };

    $scope.getDataTableDetails = function(){

      DataTable.getPatientTillDate()
        .then(function(res){
          console.log(res);
        $scope.dataTableTillDate = res.data.patient_detail_p1.till_date;
          $scope.dataTableCurrentYear = res.data.patient_detail_p1.current_year;
          $scope.dataTableCurrentMonth = res.data.patient_detail_p1.current_month;
          //console.log($scope.dataTableTillDate)
      })
    };

    $scope.getFormF = function (hos_id, p_id) {
      $scope.listFormF = [];

      DataTable.getFormF(hos_id)
        .then(function (res) {
          $scope.listFormF.push(res.data.hos_det[0]);
          DataTable.getPatientDetail(p_id)
            .then(function (response) {
              $scope.listFormF.push(response.data.patient_det[0]);
            });
        });
    };

    $scope.init = function(){
      DataTable.getHosId()
        .then(function (res) {
          $scope.hos_id = res.data.hos_id;
        });
      $scope.getDataTableDetails();
    };
    //$scope.init();
  });
