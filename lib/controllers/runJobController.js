/**
 * Created by ravikant on 2/1/14.
 */
module.exports=function(app){
    app.get("/runJob",function(req,res){
        console.log("Inside runJob");
    });
    app.get("/runJob/getJobWizardDetails",function(req,res){
        res.json(job);
    });
}

//stub
var job={
    "domainList":[{
        "name":"",
        "description":"",
        "id":"",
        "selected":false
    }],
    "dataSetList":[
        {
            "name":"Data set 1",
            "description":" Desc 1",
            "id":"1",
            "selected":false
        },
        {
            "name":"Data Set 2",
            "description":"Desc 2",
            "id":"",
            "selected":false
        }
    ],
    "modelList":[
        {
            "name":"Model  1",
            "description":"Desc 1",
            "selected":false,
            "id":""
        },
        {
            "name":"Model  2",
            "description":"Desc 2",
            "selected":false,
            "id":""
        },
        {
            "name":"Model  3",
            "description":"Desc 3",
            "selected":false,
            "id":""
        },
        {
            "name":"Model  4",
            "description":"Desc 4",
            "selected":false,
            "id":""
        }
    ],
    "dateRange":{
        "startDate":"",
        "endDate":""
    }
};