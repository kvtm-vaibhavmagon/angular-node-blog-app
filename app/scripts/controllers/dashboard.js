/**
 * Created by ravikant on 2/1/14.
 */
kadminApp.controller("DashBoardCtrl", function($scope, $http) {


    $http.get("/showpoemdashboard").success(function(data,status,headers,config){
        console.log("success",data);
        $scope.todos=data;
    }).error(function(data,status,headers,config){
            console.log("",data);
        });

    $scope.showNews = function() {
    $http.get("/nodetube").success(function(data,status,headers,config){
        console.log("success",data);
        $scope.items=data;
    }).error(function(data,status,headers,config){
            console.log("error",data);
        });
    };



});