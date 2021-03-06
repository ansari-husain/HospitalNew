'use strict';

angular.module('hospitalNewApp')
  .controller('LoginCtrl', function ($rootScope, $location, loginService, $cookies, cookieName, Auth) {
    var vm = this;

    vm.fnLogin = function () {
      Auth.login(vm.user)
        .then(function (res) {
          $location.path('/home');
        }, function (err) {
          vm.user = {};
        });
      vm.user = {};
    };

    vm.fnCancelLogin = function () {

    };
  });
