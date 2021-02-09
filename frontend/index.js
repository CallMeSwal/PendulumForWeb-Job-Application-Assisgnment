//define pendulum class
class Pendulum{
    constructor(pivotX, pivotY, x, y, mass, length, b){
        this.pivotX=pivotX;
        this.pivotY=pivotY;
        this.x=x;
        this.y=y;
        this.mass=mass;
    }
}
/*
var client = new Paho.MQTT.Client("broker.hivemq.com", 8000,"swaleh");
client.connect({
    onSuccess:function(){
        console.log('Hello MQTT');
        client.subscribe("SET09603");
        console.log('Hello MQTT2');
        var mqttMessage = new Paho.MQTT.Message("Hello from website");
        mqttMessage.destinationName = "SET09603";
        client.send(mqttMessage);
        console.log('Hello MQTT3');
    }
});*/

var gravities = [
    ["-9.81", "Earth"],
    ["-1.62", "Moon"],
    ["-3.71", "Mars"],
    ["-24.15", "Jupiter"]
]

var pends = {
    1:{mass:0, length:0, b:0},
    2:{mass:0, length:0, b:0},
    3:{mass:0, length:0, b:0},
    4:{mass:0, length:0, b:0},
    5:{mass:0, length:0, b:0}
}

function setGravity(){
    const http = new XMLHttpRequest()
    var url = "http://localhost:8111/envValues/?gravity";
    http.responseType = 'json';
    http.open("get", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        console.log(http.response);
        grav=http.response["gravity"];
        var img = "";
        for(let i=0; i<gravities.length; i++){
            if (gravities[i][0]==grav){
                img=gravities[i][1];
                break;
            }
        }
        document.getElementById("canvasMain").style.backgroundImage="url(./img/"+img+".jpg)";
    }
}

setGravity();

var thresh = 0;

function startPendulum(id){
    const http = new XMLHttpRequest()
    var url = "http://localhost:811"+id+"/start"
    http.responseType = 'json';
    http.open("GET", "http://localhost:811"+id+"/start");
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        if (http.response["message"]=="success"){
            //console.log(http.response);
        }
        else{
            console.log("Error - Pendulums could not be started.");
            startPendulums(id);
        }
    }
}

function stopPendulum(id){
    const http = new XMLHttpRequest()
    var url = "http://localhost:811"+id+"/stop"
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        if (http.response["message"]=="success"){
            //console.log(http.response);
        }
        else{
            console.log("Error - Pendulum could not be stopped.");
            startPendulums(id);
        }
    }
}

function freezePendulum(id){
    const http = new XMLHttpRequest()
    var url = "http://localhost:811"+id+"/freeze"
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        if (http.response["message"]=="success"){
            //console.log(http.response);
        }
        else{
            console.log("Error - Pendulum could not be stopped.");
            startPendulums(id);
        }
    }
}

function updatePend(id){
    const http = new XMLHttpRequest()
    var url = "http://localhost:811"+id+"/?mass&length&b"
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        pends[id]["mass"]=http.response["mass"];
        pends[id]["length"]=http.response["length"];
        pends[id]["b"]=http.response["b"];
    }
}

function startPendulums(){
    startPendulum(1);
    startPendulum(2);
    startPendulum(3);
    startPendulum(4);
    startPendulum(5);
}

function stopPendulums(){
    stopPendulum(1);
    stopPendulum(2);
    stopPendulum(3);
    stopPendulum(4);
    stopPendulum(5);
}

function freezePendulums(){
    freezePendulum(1);
    freezePendulum(2);
    freezePendulum(3);
    freezePendulum(4);
    freezePendulum(5);
}

function updatePends(){
    updatePend(1);
    updatePend(2);
    updatePend(3);
    updatePend(4);
    updatePend(5);
}

updatePends();

//Create control buttons
var restartButton=document.body.appendChild(document.createElement('button'));
restartButton.innerHTML+="RESTART PENDULUMS w/ DEFAULT CONFIG.";
restartButton.classList.add('resButton');
restartButton.onclick = function (){
    const http = new XMLHttpRequest();
    var url = "http://localhost/refresh"
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        if (http.response["message"]=="success"){
            console.log(http.response);
        }
        else{
            alert("Error - Pendulums could not be restarted.");
        }
    };
}

var startButton=document.body.appendChild(document.createElement('button'));
startButton.innerHTML+="START ALL PENDULUMS";
startButton.classList.add('resButton');
startButton.onclick = function (){
    startPendulums()
}

var stopButton=document.body.appendChild(document.createElement('button'));
stopButton.innerHTML+="PAUSE ALL PENDULUMS";
stopButton.classList.add('stopButton');
stopButton.onclick = function (){
    freezePendulums()
}

//add container for canvas
var canvasContainer=document.body.appendChild(document.createElement('div'));
canvasContainer.classList.add('container');

//create canvas for rendering pendulums
var canvas=canvasContainer.appendChild(document.createElement('canvas'));
canvas.setAttribute("id", "canvasMain");
canvas.classList.add('center');
canvas.width = window.innerWidth-100;
canvas.height = 300;

pendulums={};

for(let i=1; i<=5; i++){
    pendulums[i] = new Pendulum(canvas.width/6*i, 0, canvas.width/6*i, 100, 1);
}

function getPendulumData(url, id){
    const http = new XMLHttpRequest()
    http.responseType = 'json';
    http.open("GET", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        new_data=http.response;
        if(new_data["x"]){
            pendulums[id].x=pendulums[id].pivotX+parseFloat(new_data["x"])*200;
            //console.log(id+" "+pendulums[id].x);
        }
        if(new_data["y"]){
            pendulums[id].y=parseFloat(new_data["y"])*200;
        }
        if(new_data["mass"]){
            pendulums[id].mass=new_data["mass"];
        }
    };
}

var ctx = canvas.getContext('2d');
var firstStop=true;

//draw pendulums
function drawPendulums(){
    for(let i=1; i<=5; i++){
        getPendulumData("http://localhost:811"+i+"/?x&y&mass", i)
    }

    for(let i=1; i<5; i++){
        //console.log(pendulums[i].x-prevX);
        //console.log(thresh);
        if(pendulums[i+1].x-pendulums[i].x < thresh && firstStop){
            stopPendulums();
            firstStop=false;
            setTimeout(function(){
                startPendulums();
                return null;
            }, 5000);
            setTimeout(function(){
                firstStop=true;
            }, 6000);
            return null;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=1; i<=5; i++){
        //draw pendulum line       
        ctx.beginPath();
        ctx.moveTo(pendulums[i].pivotX, pendulums[i].pivotY);
        ctx.lineTo(pendulums[i].x, pendulums[i].y);
        ctx.stroke();
        //console.log(pendulums[i].x, pendulums[i].y);

        //draw pendulum circle
        ctx.beginPath();
        ctx.moveTo(pendulums[i].x, pendulums[i].y);
        ctx.arc(pendulums[i].x, pendulums[i].y, 25*pendulums[i].mass, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

//refresh pendulum positions
var timestep=100;
setInterval(function(){
    drawPendulums();
}, timestep);



//Create UI for adjusting environment
var environmentContainer=document.body.appendChild(document.createElement('div'));
environmentContainer.innerHTML+="<h2>Adjust Environment</h2>";

//UI for adjusing gravity
environmentContainer.innerHTML+='<span class="inline">';
environmentContainer.innerHTML+='<p class="pText">Adjust Gravity</p>';

for(let i=0; i<gravities.length; i++){
    environmentContainer.innerHTML+='<input type="radio" id="'+gravities[i][0]+'" name="gravitySelector" value="'+gravities[i][0]+'"><label for="'+gravities[i][0]+'">'+gravities[i][1]+'</label>';
}
environmentContainer.innerHTML+='</span>';

//UI for adjusting wind
environmentContainer.innerHTML+='<span class="inline">';
environmentContainer.innerHTML+='<p class="pText">Adjust Wind</p>';
var windInput = environmentContainer.appendChild(document.createElement('input'));
windInput.setAttribute('type', 'text');
windInput.setAttribute('placeholder', 'Min: 0m/s, Max: 10m/s');
windInput.setAttribute('id', 'windInput');
windInput.classList.add('windInput');
environmentContainer.innerHTML+='</span><br><br>';

//Create update environment button
var updateEnvButton=environmentContainer.appendChild(document.createElement('button'));
updateEnvButton.innerHTML+="Update Environment";
restartButton.classList.add('adjButton');
updateEnvButton.classList.add('left');
updateEnvButton.onclick = function (){
    const http = new XMLHttpRequest();
    setGravity();
    if(document.getElementById("windInput").value===null || document.querySelector('input[name=gravitySelector]:checked')===null){
        alert("Please enter/select values for wind and gravity.");
        return null;
    }

    var newW=document.getElementById("windInput").value;
    var newG=document.querySelector('input[name=gravitySelector]:checked').value;

    if((newW>5.0 ||newW<2.0) && newW!=0.0){
        alert("Wind must be between 5.0m/s and 2.0m/s or 0m/s.");
        return null;
    }
    if(newG<-30.0 || newG>-1.0){
        alert("Gravity must be between 1.0m/s^2 and 9.8m/s^2");
        return null;
    }
    for(let i=5; i>=1; i--){
        var url = "http://localhost:811"+i+"/envValues/?wind="+newW+"&gravity="+newG;
        http.responseType = 'json';
        http.open("POST", url);
        http.onerror = function () {
            console.log("Not able to access: ", url);
        };
        http.send();
        http.onload = () => {
            if(http.status==400){
                console.log(http.status, http.response);
            }
        };
    }
    
    /*
    var vals="";
    var first = true;

    if (newM!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="mass="+newM;
    }
    if (newL!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="length="+newL;
    }
    if (newT!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="theta="+newT;
    }
    if (newB!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="b="+newB;
    }
    url += vals;
    console.log(url);
    http.responseType = 'json';
    http.open("POST", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send(JSON.stringify(vals));
    http.onload = () => {
        if(http.status==400){
            alert(http.response["message"]);
            console.log(http.status, http.response);
        }
    };*/
}

//Create UI for adjusting pendulums
var pendulumParamContainer=document.body.appendChild(document.createElement('div'));
pendulumParamContainer.innerHTML+="<h2>Adjust Pendulums</h2>";

//UI for selecting pendulum
pendulumParamContainer.innerHTML+='<span class="inline">';
pendulumParamContainer.innerHTML+='<p class="pText">Select Pendulum</p>';
var pendulumOptions = [
    [1, "Pendulum 1"],
    [2, "Pendulum 2"],
    [3, "Pendulum 3"],
    [4, "Pendulum 4"],
    [5, "Pendulum 5"]
]


for(let i=0; i<pendulumOptions.length; i++){
    pendulumParamContainer.innerHTML+='<input type="radio" class="pendulumSel" pend="'+pendulumOptions[i][0]+'" name="pendulumSelector" value="'+pendulumOptions[i][0]+'"><label for="'+pendulumOptions[i][0]+'">'+pendulumOptions[i][1]+'</label>';
}
pendulumParamContainer.innerHTML+='</span>';

//UI for adjusting specified pendulum properties
pendulumParamContainer.innerHTML+='<span class="inline">';
pendulumParamContainer.innerHTML+='<p class="pText">Adjust Properties for Specified Pendulum</p>';

pendulumParamContainer.innerHTML+='<label class="pendLabel" for="massInput">Mass:</label>';
var massInput = pendulumParamContainer.appendChild(document.createElement('input'));
massInput.setAttribute('type', 'text');
massInput.setAttribute('name', 'massInput');
massInput.setAttribute('id', 'massInput');
massInput.setAttribute('placeholder', 'Min: 0.2kg, Max: 3.0kg');
massInput.classList.add('pendInput');

pendulumParamContainer.innerHTML+='<label class="pendLabel" for="massInput">Length:</label>';
var lengthInput = pendulumParamContainer.appendChild(document.createElement('input'));
lengthInput.setAttribute('type', 'text');
lengthInput.setAttribute('name', 'lengthInput');
lengthInput.setAttribute('id', 'lengthInput');
lengthInput.setAttribute('placeholder', 'Min: 0.2m, Max: 1.0m');
lengthInput.classList.add('pendInput');

pendulumParamContainer.innerHTML+='<label class="pendLabel" for="massInput">Theta:</label>';
var thetaInput = pendulumParamContainer.appendChild(document.createElement('input'));
thetaInput.setAttribute('type', 'text');
thetaInput.setAttribute('name', 'thetaInput');
thetaInput.setAttribute('id', 'thetaInput');
thetaInput.setAttribute('placeholder', 'Min: -0.8rad, Max: 0.8rad');
thetaInput.classList.add('pendInput');

pendulumParamContainer.innerHTML+='<label class="pendLabel" for="massInput">Damping Factor:</label>';
var bInput = pendulumParamContainer.appendChild(document.createElement('input'));
bInput.setAttribute('type', 'text');
bInput.setAttribute('name', 'bInput');
bInput.setAttribute('id', 'bInput');
bInput.setAttribute('placeholder', 'Min: 0.5, Max: 1.0');
bInput.classList.add('pendInput');

pendulumParamContainer.innerHTML+='</span><br><br>';

//Create update environment button
var updatePendButton=pendulumParamContainer.appendChild(document.createElement('button'));
updatePendButton.innerHTML+="Update Pendulums";
restartButton.classList.add('adjButton');
updatePendButton.classList.add('left');
updatePendButton.onclick = function (){
    const http = new XMLHttpRequest();
    var url = "http://localhost:811"+selectedPendulum;
    var newM=document.getElementById("massInput").value;
    if(newM>1.5 ||newM<0.2){
        alert("Mass must be between 0.2kg and 1.5kg.");
        return null;
    }

    var newL=document.getElementById("lengthInput").value;
    if(newL>1.0 ||newL<0.2){
        alert("Length must be between 0.1m and 1.0m.");
        return null;
    }

    var newT=document.getElementById("thetaInput").value;
    if(newT>0.8 ||newT<-0.8){
        alert("Starting angle must be between -0.8rad and 0.8rad.");
        return null;
    }

    var newB=document.getElementById("bInput").value;
    if(newB>1.0 ||newB<0.5){
        alert("Damping factor must be between 0.5 and 1.0.");
        return null;
    }
    pends[selectedPendulum]["length"]=newL;
    pends[selectedPendulum]["mass"]=newM;
    pends[selectedPendulum]["b"]=newB;
    var vals="";

    var first = true;

    if (newM!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="mass="+newM;
    }
    if (newL!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="length="+newL;
    }
    if (newT!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="theta="+newT;
    }
    if (newB!=""){
        if (first){
            vals+="?"
            first=false;
        }
        else{
            vals+="&"
        }
        vals+="b="+newB;
    }
    url += vals;
    http.responseType = 'json';
    http.open("POST", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send(JSON.stringify(vals));
    http.onload = () => {
        if(http.status==400){
            alert(http.response["message"]);
            console.log(http.status, http.response);
        }
    };
    var url = "http://localhost:/setPendulums/?pends="+JSON.stringify(pends);
    http.responseType = 'json';
    http.open("POST", url);
    http.onerror = function () {
        console.log("Not able to access: ", url);
    };
    http.send();
    http.onload = () => {
        if(http.status==400){
            console.log(http.status, http.response);
        }
    };
    
}

/*
const userAction = async () => {
    const response = await fetch('http://example.com/movies.json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}

function CreateUI() {
    const node = document.createElement('div');
    node.classList.add('card');

    function applyRandomColor() {
        node.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    }
    
    // to support older browsers, use appendChild() for every child instead
    node.append(
        CardContent(),
        CardButton({pressHandler: applyRandomColor})
        )
    
    return node
}

function CardContent() {
    const node = document.createElement('div');
    node.classList.add('card__content'); // to support older browsers, use node.setAttribute('class', 'card__content') instead
    node.textContent = 'Text text text text text text text text text text text text';
    
    return node
}

function CardButton({pressHandler}) {
    const node = document.createElement('div');
    node.textContent = 'Press me';
    node.classList.add('card__button');
    
    node.addEventListener('click', pressHandler);

    return node
}*/

var selectedPendulum = 0;

$(document).ready(function () {
    $(".pendulumSel").click(function (e) {
        var http = new XMLHttpRequest();
        var url = "http://localhost:811"+$(this).attr("value")+"?mass&length&theta&b";
        selectedPendulum = $(this).attr("value");
        http.responseType = 'json';
        http.open("GET", url);
        http.onerror = function () {
            console.log("Not able to access: ", url);
        };
        http.send();
        http.onload = () => {
            //massInput.value = http.response["mass"];
            document.getElementById("massInput").value = http.response["mass"];
            document.getElementById("lengthInput").value = http.response["length"];
            document.getElementById("thetaInput").value = http.response["theta"];
            document.getElementById("bInput").value = http.response["b"];
        };
      //e.preventDefault();
    });
  });

//UI for adjusting thre
var threshContainer=document.body.appendChild(document.createElement('div'));
threshContainer.innerHTML+='<span class="inline">';
threshContainer.innerHTML+='<p class="pText">Adjust Threshold</p>';
var threshInput = document.body.appendChild(document.createElement('input'));
threshInput.setAttribute('type', 'text');
threshInput.value=0;
threshInput.setAttribute('placeholder', 'Optional - Default is 0');
threshInput.setAttribute('id', 'threshInput');
threshInput.classList.add('threshInput');
threshContainer.innerHTML.innerHTML+='</span><br>';

$('#threshInput').focusout(function (params) {
    thresh = document.getElementById("threshInput").value;
})