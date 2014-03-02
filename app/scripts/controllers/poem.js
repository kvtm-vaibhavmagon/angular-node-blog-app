/**
 * Created by vaibhav on 1/10/14.
 */

kadminApp.controller("PoemCtrl", function($scope, $http) {


    $http.get("/showpoem/"+$scope.todoText).success(function(data,status,headers,config){


        console.log("success",data);
        console.log("string",JSON.stringify(data));
        $scope.todos=data;
    }).error(function(data,status,headers,config){
            console.log("error",data);
        });

    $http.get("/showchart/").success(function(data,status,headers,config){
        console.log("success",data);
        $scope.podos=data;
        var options = {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'User Module',
                    x: -20 //center
                },
                xAxis: {
                    title: {
                        text: 'Post Stats'
                    },
                    categories: ['Post Data']
                },
                yAxis: {
                    title: {
                        text: 'Id associated'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                exporting: {
                url: 'http://export.highcharts.com/'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: data
            };


         $('#container').highcharts(options);

    }).error(function(data,status,headers,config){
            console.log("error",data);
        });

    function updateChart(){
    $http.get("/showchart/").success(function(data,status,headers,config){
        console.log("success",data);
        $scope.podos=data;
        var options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'User Module',
                x: -20 //center
            },
            xAxis: {
                title: {
                    text: 'Post Stats'
                },
                categories: ['Post Data']
            },
            yAxis: {
                title: {
                    text: 'Id associated'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: data
        };

        $('#container').highcharts(options);

    }).error(function(data,status,headers,config){
            console.log("error",data);
        });
    }

    $scope.addTodo = function() {
        console.log("$scope.todoText",$scope.todoText);
        var obj={"data":$scope.todoText};
        $http.get("/submitpoem/"+$scope.todoText).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.todos=data;
            updateChart();
        }).error(function(data,status,headers,config){
                console.log("",data);
            });
    };

    $scope.addComment = function() {
        console.log($scope.currentid);

        console.log("$scope.todoCommentText",$scope.todoCommentText);
        var obj={"data":$scope.todoCommentText};
        $http.get("/commentpoem/"+$scope.currentid+"/"+$scope.todoCommentText).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.commnets=data;

        }).error(function(data,status,headers,config){
                console.log("",data);
            });
    };

    $scope.showComment = function(){
        console.log($scope.currentid);
        $http.get("/showcomment/"+$scope.currentid+"/"+$scope.todoCommentText).success(function(data,status,headers,config){
            console.log("$scope.todoCommentText",$scope.todoCommentText);
            console.log("success",data);
            console.log("string",JSON.stringify(data));
            $scope.comments=data;
        }).error(function(data,status,headers,config){
                console.log("error",data);
            });
    };


    $(".singlepost").hide();
    $(".comment").hide();

    $scope.doneTodo = function(){
        $(".singlepost").hide();
        $(".allpost").show();
        $http.get("/showpoem/"+$scope.todoText).success(function(data,status,headers,config){
            console.log("success",data);
            console.log("string",JSON.stringify(data));
            $scope.todos=data;
        }).error(function(data,status,headers,config){
                console.log("error",data);
            });
    }

    $scope.viewTodo = function(index) {
        $(".comment").show();
        $(".add").hide();
        $(".singlepost").show();
        $scope.currentid= index;
        console.log(index);
        var obj={"data":$scope.todoText};
        console.log("object",obj);
        $http.get("/viewpoem/"+index).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.todos=data;

        }).error(function(data,status,headers,config){
                console.log("",data);
            });
    };

    $scope.deleteTodo = function(index) {
        console.log(index);
        console.log("$scope.todoText",$scope.todoText);
        var obj={"data":$scope.todoText};
        $http.get("/deletepoem/"+index).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.todos=data;
            updateChart();
        }).error(function(data,status,headers,config){
                console.log("",data);
            });
    };

    $(".edit").hide();
    $(document).on("click",".edittoggle2",function(){
        $(".edit").hide();
    });

    $scope.likeTodo = function (){
        $(".like").hide();
        $(".unlike").show();
        console.log($scope.currentid);
        $scope.like=1;
        $http.get("/likepoem/"+$scope.currentid+"/"+$scope.like).success(function(data,status,headers,config){
            console.log("like",$scope.like);
            console.log("success",data);
            $scope.todos=data;

        }).error(function(data,status,headers,config){
                console.log("",data);
            });

    };

    $scope.unlikeTodo = function (){
        $(".like").show();
        $(".unlike").hide();
        console.log($scope.currentid);
        $scope.unlike=0;
        $http.get("/likepoem/"+$scope.currentid+"/"+$scope.unlike).success(function(data,status,headers,config){
            console.log("like",$scope.unlike);
            console.log("success",data);
            $scope.todos=data;

        }).error(function(data,status,headers,config){
                console.log("",data);
            });

    };

    $scope.showEdit = function(index){
        console.log("success",index);
        $("#hiddenid").attr("value",index);
        $(".edit").show();
    };

    $scope.updateTodo = function() {
        var id= $("#hiddenid").attr("value");

        console.log("$scope.todoEditText",$scope.todoEditText);
        var obj={"data":$scope.todoEditText};
        $http.get("/editpoem/"+id+"/"+ $scope.todoEditText).success(function(data,status,headers,config){
            console.log("success",data);
            $scope.todos=data;
            updateChart();
        }).error(function(data,status,headers,config){
                console.log("",data);
            });
    };


    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };



});