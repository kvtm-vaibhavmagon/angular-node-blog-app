/**
 * Created by ravikant on 2/1/14.
 */
module.exports=function(app){
    app.get("/dashBoard",function(req,res){
        console.log("Inside Dashboard");
        res.render('index');
    });
}