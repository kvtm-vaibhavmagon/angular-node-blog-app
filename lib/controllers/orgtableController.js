/**
 * Created by vaibhav on 1/10/14.
 */

module.exports=function(app){
    app.get("/orgTable",function(req,res){
        console.log("Inside OrgTable");
        res.render('index');
    });
}