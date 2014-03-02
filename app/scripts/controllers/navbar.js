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
    },
    {
    'title': 'The place to chat!',
    'name': 'Chat Room',
    'link': '/#/orgTable'
    },
    {
      'title': 'Run Job : Wizard for submitting job',
      'name': 'Run Job ',
      'link': '/#/runJob'
    }];

    $scope.isActive = function(route) {
        //console.log(route);
        //console.log($location.path());
      return route === $location.path();
    };

  });
