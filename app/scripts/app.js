'use strict';

/**
 * @ngdoc overview
 * @name hospitalNewApp
 * @description
 * # hospitalNewApp
 *
 * Main module of the application.
 */
angular
  .module('hospitalNewApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])
  .constant('base_url1','http://www.jaliyaninfotech.com/hospital/hospital_service1.php?')
  .constant('cookieName','dho_login')
  .config(function ($urlRouterProvider,$locationProvider,$stateProvider) {

      $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('main',{
        url:'',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        abstract:true
      })
      .state('main.login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        authenticate: false,
        controllerAs: 'login'
      })
      .state('main.home',{
        url:'/home',
        templateUrl: 'views/home.html',
        authenticate: true,
        controller: ''
      })
      .state('main.dataTable',{
        url:'/DataTable',
        templateUrl: 'views/dataTable.html',
        authenticate: true,
        controller: 'userController'
      });
  })
  .run(function ($rootScope, $location, Auth, $state) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $state.go('main.login');
          event.preventDefault();
        }
        if (!next.authenticate && loggedIn) {
          $state.go('main.home');
        }
      });
    });
  });
