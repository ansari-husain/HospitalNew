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
  .config(function ($urlRouterProvider,$locationProvider,$stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/',{
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
