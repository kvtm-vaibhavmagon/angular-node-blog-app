'use strict';

var kadminApp=angular.module('kadminApp', ["ngResource","ngRoute"]);

kadminApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", { redirectTo: "/poem" })
        .when("/dashBoard", { templateUrl: "partials/dashboard.html", controller: "DashBoardCtrl" })
        .when("/runJob", { templateUrl: "partials/runJob.html", controller: "RunJobCtrl" })
        .when("/poem", { templateUrl: "partials/poem.html", controller: "PoemCtrl" })
        .when("/orgTable", { templateUrl: "partials/orgtable.html", controller: "OrgTableCtrl" })
        .when("/login", { templateUrl: "partials/login.html", controller: "LoginCtrl" })
        .otherwise({ redirectTo: "/dashBoard" });
}]);
