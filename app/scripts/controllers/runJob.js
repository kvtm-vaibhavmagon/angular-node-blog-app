/**
 * Created by ravikant on 2/1/14.
 */
kadminApp.controller("RunJobCtrl", function($scope, $location,$http) {
    $scope.wizard=wizard;
    $scope.jobSelectedTemp={
        "domain":-1,
        "dataSet":-1
    }
    $scope.jobDataToBeSubmitted=function(){
        var obj={"domain":{},"dataSet":{},"models":[]};
        if(jobSelectedTemp.domain>-1){
            obj.domain=$scope.jobStruct.domainList[jobSelectedTemp.domain];
        }
        if(jobSelectedTemp.dataSet>-1){
            obj.dataSet=$scope.jobStruct.dataSetList[jobSelectedTemp.dataSet];
        }
        for(var i=0;i<$scope.jobStruct.modelList.length;i++){
                var model=$scope.jobStruct.modelList[i];
                if(model.selected){
                    obj.models.push(model);
                }
        }
        if(jobSelectedTemp.dataSet>-1){
            $scope.jobStruct.modelList[jobSelectedTemp.dataSet];
        }
        $scope.jobSubmitData=obj;
    }
    $http.get('/runJob/getJobWizardDetails').success(function(data,status,headers,config){
        //success
        $scope.jobStruct=data;
    }).error(function(data,status,headers,config){
        //error
        console.log("Error",data,status,headers,config);
    })

    $('.step-pane').hide();
    $('.step-pane.active').show();
    $('.next').removeClass('arrow-right-disabled');
    $('.next').addClass('arrow-right-enabled');

    $( window ).resize(function() {
        wizard.wizardResize();
    });
    //For Switch
    $scope.toggleSelected=function (event){
        var currentVal=event.model.selected;
        console.log("cureentVal",currentVal);
        if(currentVal){
            event.model.selected=false;
        }else{
            event.model.selected=true;
        }
    }

});
var wizard={
    "steps":[
        {"name":"Select Domain","lineClass1":"step-line-end","lineClass2":"step-line-middle","activeClass":"active"},
        {"name":"Select Data Set","lineClass1":"step-line-middle","lineClass2":"step-line-middle","activeClass":""},
        {"name":"Select Model","lineClass1":"step-line-middle","lineClass2":"step-line-middle","activeClass":""},
        {"name":"Initialize Variables","lineClass1":"step-line-middle","lineClass2":"step-line-middle","activeClass":""},
        {"name":"Review & Excecute","lineClass1":"step-line-middle","lineClass2":"step-line-end","activeClass":""}
    ],
    "next":function(){
        var currentDataTargetId=$('.wizard-steps > li.active').attr('data-target');
        var currentStepId=(currentDataTargetId).substring(1,currentDataTargetId.length);
        var currentStepNum=parseInt(currentStepId.substring(4,currentStepId.length),10);
        var nextStepNum=currentStepNum+1;
        var totalSteps=$('.wizard-steps > li').length;
        var nextStepId='step'+nextStepNum;
        if(nextStepNum<=totalSteps){
            $(currentDataTargetId).hide();
            $('.wizard-steps > li').removeClass('active');
            $('.wizard-steps > li').each(function(){
                if($(this).attr('data-target')=='#'+nextStepId){
                    $(this).addClass('active');
                }
            });
            $('.step-pane').removeClass('active');
            $('#'+nextStepId).show();
            $('#'+nextStepId).addClass('active');
            $('.prev').addClass('arrow-left-enabled');
            if(nextStepNum==totalSteps){
                $('.next').removeClass('arrow-right-enabled');
                $('.next').addClass('arrow-right-disabled');
            }
        }
        wizard.wizardResize();
    },
    "prev":function(){
        var currentDataTargetId=$('.wizard-steps > li.active').attr('data-target');
        var currentStepId=(currentDataTargetId).substring(1,currentDataTargetId.length);
        var currentStepNum=parseInt(currentStepId.substring(4,currentStepId.length),10);
        var prevStepNum=currentStepNum-1;
        var totalSteps=$('.wizard-steps > li').length;
        var prevStepId='step'+prevStepNum;
        console.log("prevStepNum",prevStepNum);
        if(prevStepNum>=1){
            $(currentDataTargetId).hide();
            $('.wizard-steps > li').removeClass('active');
            $('.wizard-steps > li').each(function(){
                if($(this).attr('data-target')=='#'+prevStepId){
                    $(this).addClass('active');
                }
            });
            $('.step-pane').removeClass('active');
            $('#'+prevStepId).show();
            $('#'+prevStepId).addClass('active');
            $('.next').addClass('arrow-right-enabled');
            if(prevStepNum==1){
                $(this).removeClass('arrow-left-enabled');
                $(this).addClass('arrow-left-disabled');
            }

        }

    },
    "wizardResize":function(){
        wizard.verticalMiddleAlign($('.wizard-steps > li  > .row > .step-circle'),null,$('.wizard-steps > li  > .row > .step-line'));
        var liW=100/$('.wizard-steps > li').length;
        $('.wizard-steps li').css('width',liW+"%");
        wizard.horizontalMiddleAlign($('.wizard-steps > li'),$('.wizard-steps > li  > .row > .step-circle'),$('.wizard-steps li .step-line'));

        wizard.verticalMiddleAlign($('.arrow-container'),null,$('.prev'));
        wizard.verticalMiddleAlign($('.arrow-container'),null,$('.next'));

        wizard.horizontalMiddleAlign($('.prev').parent(),null,$('.prev'));
        wizard.horizontalMiddleAlign($('.next').parent(),null,$('.next'));
    },
    "verticalMiddleAlign":function(fullHeightSelector,sourceSelector,targetSelector){
        var fullHeight=fullHeightSelector.height();
        var sourceHeight=0;
        if(sourceSelector){
            sourceHeight=sourceSelector.height();
        }
        var targetHeight=((fullHeight-sourceHeight)/2)+2;
        targetSelector.css('margin-top',targetHeight+"px");
    },
    "horizontalMiddleAlign":function(fullWidthSelector,sourceSelector,targetSelector){
        var fullWidth=fullWidthSelector.width();
        var sourceWidth=0;
        if(sourceSelector){
            sourceWidth=sourceSelector.width();
        }
        var targetWidth=((fullWidth-sourceWidth)/2)+2;
        targetSelector.css('width',targetWidth+"px");
    }
}
