angular.module("hospitalNewApp")
  .controller('userController', function ($scope, $http, DataTable) {

    //$scope.areas=['NANPURA','KATARGAM','VARACHHA','MOTA VARACHHA','NANA VARACHHA','UDHNA','ADAJAN','MAJURA','SALABATPURA'];
$scope.areas=[];
    $scope.getStatesArray = function(){
      DataTable.getStates()
        .then(function(res){
            $scope.statesArr = [];
            angular.forEach(res.data,function(obj){
            $scope.statesArr.push(obj);
            $scope.getCity = '';
          })
        })
    };

    $scope.getCities = function(state){
      if(state == ""){
        $scope.citiesArr = [];
        $scope.cityName = '';
        $scope.stateName = '';
        $scope.getDataTableDetails()
      }else {
        angular.forEach($scope.statesArr, function (obj) {
          $scope.citiesArr = [];
          if (obj.state_code == state) {
            $scope.stateName = obj.state_name;
            $scope.getDataTableDetails($scope.stateName);
          }
        });
        DataTable.getCities($scope.getState)
          .then(function(res){
            if(res.data !== null && !res.data.includes('null')){
              angular.forEach(res.data,function(obj){
                if(obj){
                  $scope.citiesArr.push(obj);
                }
                $scope.isCity = true;
              });
            }
          },function(err){
            //console.log(err);
          })
      }


    };

    $scope.select = function () {
      DataTable.getHospitalId($scope.ms)
        .then(function (res) {
          $scope.result = res.data.FormF;
        });
    };

    $scope.getDataTableDetails = function(state,city){

      if($scope.getCity && $scope.getCity !== "") {
           angular.forEach($scope.citiesArr, function (obj) {
              if (obj.city_code == city) {
                    $scope.cityName = obj.city_name;
                  }
        });
      }else {
        $scope.cityName = '';
      }
      DataTable.getPatientTillDate($scope.stateName,$scope.cityName)
        .then(function(res){
          if($scope.cityName){
            DataTable.getPatientDetailAllArea($scope.stateName,$scope.cityName)
              .then(function(res){
                $scope.areas = res.data.patient_detail_area.till_date;
              })
          }else{
            $scope.areas = [];
          }
          var dataTableP1 = res.data.patient_detail_p1;
          var dataTableP2 = res.data.patient_detail_p2;
          var dataTableP3 = res.data.patient_detail_p3;

          $scope.dataTableTillDate = dataTableP1.till_date;
          $scope.dataTableCurrentYear = dataTableP1.current_year;
          $scope.dataTableCurrentMonth = dataTableP1.current_month;
          $scope.dataTablePreviousMonth = dataTableP1.previous_month;

          $scope.dataTableTillDate.modeOfPregnancy = dataTableP3.till_date;
          $scope.dataTableCurrentYear.modeOfPregnancy = dataTableP3.current_year ;
          $scope.dataTableCurrentMonth.modeOfPregnancy = dataTableP3.current_month;
          $scope.dataTablePreviousMonth.modeOfPregnancy = dataTableP3.previous_month;

          if( dataTableP2 && dataTableP2.till_date) {

            var pregnancyAgeWiseTillDate = dataTableP2.till_date;
            $scope._12to17 = [];
            $scope._18to30 = [];
            $scope._30plus = [];

            angular.forEach(pregnancyAgeWiseTillDate, function (obj) {
              var num = parseInt(obj.week);
              if (num >= 12 && num <= 17) {
                $scope._12to17.push(num);
              } else if (num >= 18 && num <= 30) {
                $scope._18to30.push(num);
              } else if (num > 30) {
                $scope._30plus.push(num);
              }
            });
            $scope.dataTableTillDate._12to17 = $scope._12to17.length ;
            $scope.dataTableTillDate._18to30 = $scope._18to30.length ;
            $scope.dataTableTillDate._30plus = $scope._30plus.length ;
          }else{
            $scope.dataTableTillDate._12to17 = 0 ;
            $scope.dataTableTillDate._18to30 = 0 ;
            $scope.dataTableTillDate._30plus = 0 ;
          }

          if( dataTableP2 && dataTableP2.current_year) {

            var pregnancyAgeWiseCurrentYear = dataTableP2.current_year;
            $scope._12to17 = [];
            $scope._18to30 = [];
            $scope._30plus = [];

            angular.forEach(pregnancyAgeWiseCurrentYear, function (obj) {
              var num = parseInt(obj.week);
              if (num >= 12 && num <= 17) {
                $scope._12to17.push(num);
              } else if (num >= 18 && num <= 30) {
                $scope._18to30.push(num);
              } else if (num > 30) {
                $scope._30plus.push(num);
              }
            });
            $scope.dataTableCurrentYear._12to17 = $scope._12to17.length ;
            $scope.dataTableCurrentYear._18to30 = $scope._18to30.length ;
            $scope.dataTableCurrentYear._30plus = $scope._30plus.length ;
          }else{
            $scope.dataTableCurrentYear._12to17 = 0 ;
            $scope.dataTableCurrentYear._18to30 = 0 ;
            $scope.dataTableCurrentYear._30plus = 0 ;
          }

          if( dataTableP2 && dataTableP2.current_month) {

            var pregnancyAgeWiseCurrentMonth = dataTableP2.current_month;
            $scope._12to17 = [];
            $scope._18to30 = [];
            $scope._30plus = [];

            angular.forEach(pregnancyAgeWiseCurrentMonth, function (obj) {
              var num = parseInt(obj.week);
              if (num >= 12 && num <= 17) {
                $scope._12to17.push(num);
              } else if (num >= 18 && num <= 30) {
                $scope._18to30.push(num);
              } else if (num > 30) {
                $scope._30plus.push(num);
              }
            });
            $scope.dataTableCurrentMonth._12to17 = $scope._12to17.length ;
            $scope.dataTableCurrentMonth._18to30 = $scope._18to30.length ;
            $scope.dataTableCurrentMonth._30plus = $scope._30plus.length ;
          }else{
            $scope.dataTableCurrentMonth._12to17 = 0 ;
            $scope.dataTableCurrentMonth._18to30 = 0 ;
            $scope.dataTableCurrentMonth._30plus = 0 ;
          }

          if( dataTableP2 && dataTableP2.previous_month) {

            var pregnancyAgeWisePreviousMonth = dataTableP2.previous_month;
            $scope._12to17 = [];
            $scope._18to30 = [];
            $scope._30plus = [];

            angular.forEach(pregnancyAgeWisePreviousMonth, function (obj) {
              var num = parseInt(obj.week);
              if (num >= 12 && num <= 17) {
                $scope._12to17.push(num);
              } else if (num >= 18 && num <= 30) {
                $scope._18to30.push(num);
              } else if (num > 30) {
                $scope._30plus.push(num);
              }
            });
            $scope.dataTablePreviousMonth._12to17 = $scope._12to17.length ;
            $scope.dataTablePreviousMonth._18to30 = $scope._18to30.length ;
            $scope.dataTablePreviousMonth._30plus = $scope._30plus.length ;
          }else{
            $scope.dataTablePreviousMonth._12to17 = 0 ;
            $scope.dataTablePreviousMonth._18to30 = 0 ;
            $scope.dataTablePreviousMonth._30plus = 0 ;
          }
      })
    };

    $scope.getAreas = function(state,city){
      console.log(state,city);
      DataTable.getPatientDetailAllArea(state,city)
        .then(function(res){
           $scope.areas = [];

          $scope.areas = res.data.patient_detail_area.till_date;
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
