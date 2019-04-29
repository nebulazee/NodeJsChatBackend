

/* var socket = io.connect('http://localhost:4000?foo='+"hjhj",{
   // query:personLoggedIn
}); */
var socket;
global : var personLoggedIn;
var recipient;
var o={connected:false};
//dom elements
var message=document.getElementById('message');
var sendBtn=document.getElementById('send');
var handle=document.getElementById('handle');
var output=document.getElementById('output');
var onlineUsersBtn=document.getElementById('onlineUsers');
var logout=document.getElementById('logout');
function getHandle(){
     
    console.log("hello"+document.cookie)
    var a=document.cookie.split("=");
    personLoggedIn=a[1];
    console.log("the person logged in is "+personLoggedIn)
    document.getElementById('handle').value="Hi "+a[1]+" !";
    //make a promise
    socket = io.connect('http://localhost:4000?userLoggedIn='+personLoggedIn,{
   // query:personLoggedIn
});
    o.connected=true;

}

//on getting message from a user
/* if(o.watch('connected',function(id,oldval,newval){
    return newval;
})){
socket.on('chat',function(data){
    console.log("the data from backend is "+data.message);
    output.innerHTML+='<p><strong>'+data.handle+ ':</strong>'+data.message+'</p>'
})
} */
socket = io.connect('http://localhost:4000')
socket.on('chat',function(data){
    console.log("the data from backend is "+data.message);
    if(data.recipient==personLoggedIn)
    output.innerHTML+='<p><strong>'+data.handle+ ':</strong>'+data.message+'</p>'
})
//Vanilla javascript
sendBtn.addEventListener('click',function(){
socket.emit('chat',{

    handle:personLoggedIn,
    message:message.value,
    recipient:recipient
})
output.innerHTML+='<p align="right"><strong> me :</strong>'+message.value+'</p>'
message.value="";
});



 onlineUsersBtn.addEventListener('click',function(){
    /* var client=new HttpClient();
    client.get('http://localhost:3000/login/onlineUsers',function(response){
        console.log(response);
    });*/ 
    const http=new XMLHttpRequest();
    const url="http://localhost:3000/login/onlineUsers";
    http.open("GET",url);
    http.send();

    http.onreadystatechange=(e)=>{
        console.log(http.responseText)
        console.log(typeof(http.responseText))
        var obj=JSON.parse(http.responseText);
        console.log(obj)
        console.log(obj.onlineUsersData)
        var out='<ul>';
        for(var i=0;i<obj.onlineUsersData.length;i++)
        {
            out+='<li onclick=getVal("'+obj.onlineUsersData[i]+'")>'+obj.onlineUsersData[i]+'</li>';
        }
        out+='</ul>';
        document.getElementById('onlineUsersOutput').innerHTML=out;
    }
    var x = document.getElementById("onlineUsersOutput");
    if (x.style.display === "none") {
             x.style.display = "block";
    } else {
             x.style.display = "none";
    }
}); 
function getVal(val){
 console.log(val);
 recipient=val;   
}
logout.addEventListener('click',function(){
    const http=new XMLHttpRequest();
    const url="http://localhost:3000/login/signOut?username="+personLoggedIn;
    http.open("GET",url);
    http.send();

    http.onreadystatechange=(e)=>{
        console.log(http.responseText);
        window.location.replace("http://localhost:3000/login");
    }
})