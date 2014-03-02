/**
 * Created by ravikant on 2/1/14.
 */
$(document).ready(function(){

    $('.step-pane').hide();
    $('.step-pane.active').show();
    $('.next').removeClass('arrow-right-disabled');
    $('.next').addClass('arrow-right-enabled');

    wizardResize();
});
$( window ).resize(function() {
    wizardResize();
});
/*$(document).on('click', '.next',function() {
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
    wizardResize();

});

$(document).on('click', '.prev',function() {
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

        wizardResize();
 });*/

$(document).on('click', '.step-circle',function() {
        var currentDataTargetId=$('.wizard-steps > li.active').attr('data-target');
        var dataTarget=$(this).parent().parent().attr('data-target');
        var dataTargetId=(dataTarget).substring(1,dataTarget.length);
        $('.wizard-steps > li').removeClass('active');
        $(this).parent().parent().addClass('active');
        $(currentDataTargetId).hide();
        $(dataTarget).show();

});
$(document).on('click', '.bool-slider .inset .control',function() {
    if (!$(this).parent().parent().hasClass('disabled')) {
        if ($(this).parent().parent().hasClass('true')) {
            $(this).parent().parent().addClass('false').removeClass('true');
            $(this).parent().find('.glyphicon').remove();
            $(this).parent().append('<span class="glyphicon glyphicon-remove icon" ></span> ');
        } else {
            $(this).parent().parent().addClass('true ').removeClass('false');
            $(this).parent().find('.glyphicon').remove();
            $(this).parent().prepend('<span class="glyphicon glyphicon-ok icon"></span> ');
        }
    }
});

function wizardResize(){
    verticalMiddleAlign($('.wizard-steps > li  > .row > .step-circle'),null,$('.wizard-steps > li  > .row > .step-line'));
    var liW=100/$('.wizard-steps > li').length;
    $('.wizard-steps li').css('width',liW+"%");
    horizontalMiddleAlign($('.wizard-steps > li'),$('.wizard-steps > li  > .row > .step-circle'),$('.wizard-steps li .step-line'));

    verticalMiddleAlign($('.arrow-container'),null,$('.prev'));
    verticalMiddleAlign($('.arrow-container'),null,$('.next'));

    horizontalMiddleAlign($('.prev').parent(),null,$('.prev'));
    horizontalMiddleAlign($('.next').parent(),null,$('.next'));
}
function verticalMiddleAlign(fullHeightSelector,sourceSelector,targetSelector){
    var fullHeight=fullHeightSelector.height();
    var sourceHeight=0;
    if(sourceSelector){
        sourceHeight=sourceSelector.height();
    }
    var targetHeight=((fullHeight-sourceHeight)/2)+2;
    targetSelector.css('margin-top',targetHeight+"px");
}

function horizontalMiddleAlign(fullWidthSelector,sourceSelector,targetSelector){
    var fullWidth=fullWidthSelector.width();
    var sourceWidth=0;
    if(sourceSelector){
        sourceWidth=sourceSelector.width();
    }
    var targetWidth=((fullWidth-sourceWidth)/2)+2;
    targetSelector.css('width',targetWidth+"px");
}
