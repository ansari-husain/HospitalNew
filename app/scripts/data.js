angular.module("hospitalNewApp")
  .controller('userController', function ($scope, $http, DataTable) {

    $scope.areas=['NANPURA','KATARGAM','VARACHHA','MOTA VARACHHA','NANA VARACHHA','UDHNA','ADAJAN','MAJURA','SALABATPURA'];

    $scope.getStatesArray = function(){
      DataTable.getStates()
        .then(function(res){
          $scope.statesArr = [];
          angular.forEach(res.data,function(obj){
            $scope.statesArr.push(obj.state);
          })
        })
    };

    $scope.getCity = function(){
    $scope.getDataTableDetails($scope.getState);

    DataTable.getCities($scope.getState)
      .then(function(res){
          $scope.citiesArr = [];
          angular.forEach(res.data,function(obj){
            if(obj.city !== null &&  obj.city !== undefined){
              $scope.citiesArr.push(obj.city);
            }
            $scope.isCity = true;
          });
      },function(err){
        console.log(err);
      })
    };

    $scope.select = function () {
      DataTable.getHospitalId($scope.ms)
        .then(function (res) {
          $scope.result = res.data.FormF;
        });
    };

    $scope.getDataTableDetails = function(state,city){

      DataTable.getPatientTillDate(state,city)
        .then(function(res){
          //console.log(res);
          var pregnancyAgeWise = res.data.patient_detail_p2;
           $scope._12to17 = [];
           $scope._18to30 = [];
           $scope._30plus = [];
          angular.forEach(pregnancyAgeWise,function(obj){
            var num = parseInt(obj.week);
            if(num >= 12 && num <= 17 ){
              $scope._12to17.push(num);
            } else if(num >=18 && num <= 30){
              $scope._18to30.push(num);
            } else if(num > 30 ){
              $scope._30plus.push(num);
            }
          });
          var dataTablep3 = res.data.patient_detail_p3;

          $scope.dataTableTillDate = res.data.patient_detail_p1.till_date;
            $scope.dataTableTillDate._12to17 = $scope._12to17.length ;
            $scope.dataTableTillDate._18to30 = $scope._18to30.length ;
            $scope.dataTableTillDate._30plus = $scope._30plus.length ;
            $scope.dataTableTillDate.modeOfPregnancy = dataTablep3.till_date;

          $scope.dataTableCurrentYear = res.data.patient_detail_p1.current_year;
            $scope.dataTableCurrentYear.modeOfPregnancy = dataTablep3.current_year ;

          $scope.dataTableCurrentMonth = res.data.patient_detail_p1.current_month;
            $scope.dataTableCurrentMonth.modeOfPregnancy = dataTablep3.current_month;
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
      $scope.getStatesArray();
      DataTable.getHosId()
        .then(function (res) {
          $scope.hos_id = res.data.hos_id;
        });
      $scope.getDataTableDetails();
    };
    //$scope.init();
  });
