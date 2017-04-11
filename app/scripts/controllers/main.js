'use strict';

/**
 * @ngdoc function
 * @name hospitalNewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hospitalNewApp
 */
angular.module('hospitalNewApp')
  .controller('MainCtrl', function (Auth, $location) {

    var vm = this;
    vm.isAdmin = Auth.isAdmin ;
    vm.isLoggedIn = Auth.isLoggedIn;

    vm.fnLogout = function(){
      Auth.logout();
      $location.path('/login');
    };
  });
