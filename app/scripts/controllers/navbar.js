'use strict';

angular.module('kadminApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'Writing post : Check all running jobs',
      'name': 'Poem',
      'link': '/#/dashBoard'
    },
    {
    'title': 'Dashboard : Check all running jobs',
    'name': 'Dashboard',
    'link': '/#/poem'
    }];

    $scope.isActive = function(route) {
        //console.log(route);
        //console.log($location.path());
      return route === $location.path();
    };

  });
