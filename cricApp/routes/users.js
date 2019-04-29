var express = require('express');
var router = express.Router();
var path=require('path');
var Users=require('../models/userModels');
var session=require('express-session');
var sessionStorage=require('sessionstorage');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser())
app.use(session({secret:'ssshhhh'}))
/* GET users listing. */




router.get('/', function(req, res, next) {
  path1=path.join(__dirname,'../public/html/login.html');
  console.log("username is "+req.query.username);
  res.cookie('username',req.query.username);
  res.sendFile(path1);
});
var sess;
router.get('/checkUserCredentials',function(req,res,next){
  console.log(req.query.username);
  const user = Users.find({username:req.query.username,password:req.query.password});
    console.log('check---'+user)
    if(!user ) return res.sendStatus(401);
    path2=path.join(__dirname,'../public/html/index.html');
    //sess=req.session;
    //sess.username=req.query.username;
    res.cookie('username',req.query.username);
    
    res.sendFile(path2);
   //res.send(" wow login successful");  
});
router.get('/checkUserCredentialsForMobile',function(req,res,next){
  console.log(req.query.username);
  const user = Users.find({username:req.query.username,password:req.query.password});
    console.log('check---'+user)
    if(!user ) return res.sendStatus(401);
    path2=path.join(__dirname,'../public/html/index.html');
    //sess=req.session;
    //sess.username=req.query.username;
    res.cookie('username',req.query.username);
    
    //res.sendFile(path2);
   res.send(" wow login successful");  
});
router.post('/save',function(req,res,next){

  console.log(req.body.username);
  user1=new Users({
    username:req.body.username,
    password:req.body.password
  })
  user1.save(function(err){
  if(err)
  {console.log('error ocuured during saving')
    throw err;
  }
  console.log('user saved successfully');
  });
  path1=path.join(__dirname,'../public/html/login.html');
  res.sendFile(path1);
});

router.get('/onLineUsers',function(req,res,next){
  var onLineUsers=sessionStorage.getItem('onlineUsers');
  console.log('in online users call with '+onLineUsers);
  res.send({
    onlineUsersData:onLineUsers
  });
});

router.get('/signOut',function(req,res,next){
  onLineUsers=sessionStorage.getItem('onlineUsers');
  var user=req.query.username;
  console.log("the item to be deleted is "+user);
  console.log(onLineUsers);
  var index=onLineUsers.indexOf(user);
  if(index>-1)
  {
    onLineUsers.splice(index,1);
    console.log("item deleted"+onLineUsers);
    sessionStorage.setItem('onlineUsers',onLineUsers);
  }
  path1=path.join(__dirname,'../public/html/login.html');
  res.sendFile(path1);
});
module.exports = router;
