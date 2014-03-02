

module.exports=function(app){
    app.get("/login",function(req,res){
        console.log("Please Login");
        res.render('login');
    });
}