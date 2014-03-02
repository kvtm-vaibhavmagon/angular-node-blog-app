/**
 * Created by vaibhav on 1/10/14.
 */

kadminApp.controller("LoginCtrl", function($scope, $http) {

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);
        var obj={"email":$scope.email,"pass":$scope.password};
        $http.get("/loginpoem/"+$scope.email+$scope.password).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.login=data;

        }).error(function(data,status,headers,config){
                console.log("",data);
            });


    };

});