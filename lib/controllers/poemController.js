/**
 * Created by vaibhav on 1/10/14.
 */

module.exports=function(app){
    app.get("/poem",function(req,res){
        console.log("Inside Poem");
        res.render('index');
    });
}