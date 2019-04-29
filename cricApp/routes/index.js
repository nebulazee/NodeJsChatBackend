var express = require('express');
var router = express.Router();
var socket=require('socket.io');
var cricLive=require('cric-live');
var path=require('path')
var sessionStorage=require('sessionstorage');
/* GET home page. */
 /* router.get('/', function(req, res, next) {
  //console.log(__dirname);
  path1=path.join(__dirname,'../public/html/index.html')
  console.log(path1)
  res.sendFile(path1)
}); */
 

//
/**
 * Here the chat socket code starts
 */
//



/* const matches=cricLive.getRecentMatches().then(currentMatches=>{
  console.log(currentMatches);  
}); */
/* cricLive.getLiveScore(2).then(liveScore=>{
  console.log(liveScore);
});
 */
router.get('/cricInfo',function(req,res,next){
    const matches=cricLive.getRecentMatches().then(currentMatches=>{
    console.log(currentMatches);
    res.send(currentMatches);  
  });
})



var app=express();
var server=app.listen(4000,function(){
  console.log('listening at 4000 port');
});
app.use(express.static('../public/html'));
var io=socket(server);
//for online users session
var onlineUsers=[];
sessionStorage.setItem('onlineUsers',onlineUsers);

io.on('connection',function(socket){
  console.log('connecion made',socket.id);
  console.log(socket.request._query['userLoggedIn'])
  var user=socket.request._query['userLoggedIn'];
  onlineUsers=sessionStorage.getItem('onlineUsers');
  if(null!=user && onlineUsers.indexOf(user)==-1)
  onlineUsers.push(user);
  console.log('online users '+onlineUsers);
  sessionStorage.setItem('onlineUsers',onlineUsers);
  socket.on('chat',function(data){
    console.log("the dtata from frontend is= "+data.message);
    console.log("the dtata from frontend is= "+data.recipient);
    console.log("the dtata from frontend is= "+data.handle);
    io.sockets.emit('chat',data);
  })
  socket.on('mobileUserConnect',function(data){
    console.log("mobile connected"+data);
  })
});

module.exports = router;
