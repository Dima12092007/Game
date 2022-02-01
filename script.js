var intervalId;

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd',  '<div id="helloText">Нажмите клавишу enter чтобы начать игру</div>');
var helloText = document.getElementById('helloText');
helloText.style.display = "block";
helloText.style.textAlign = "center";
helloText.style.fontSize = 72+"pt";

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', ' <div id="scoreObj"></div>');
var scoreObj = document.getElementById('scoreObj');
scoreObj.style.textAlign = "center";
scoreObj.style.fontSize = 72+"pt";
var score = 0;
scoreObj.style.display = "none";

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', ' <div id="timerObj"></div>');
var timerObj = document.getElementById('timerObj');
timerObj.style.textAlign = "center";
timerObj.style.fontSize = 72+"pt";
timerObj.style.display = "none";

document.getElementsByTagName('body')[0].insertAdjacentHTML
('beforeEnd', '<img src="img/pig.png" id="pig">');
var pig = document.getElementById('pig');
pig.style.position = 'fixed';
pig.style.display = "none";


document.getElementsByTagName('body')[0].insertAdjacentHTML
('beforeEnd', '<img src="img/orange.png" id="orange">');
var orange = document.getElementById('orange');
orange.style.position = 'fixed';
orange.style.display = "none";

var enterListener = function(event){startGame(event)};
document.addEventListener("keydown", enterListener);

function settimer(timeToSet){
    console.log(timer);
    timerObj.innerHTML = "Время: "+ timeToSet.toFixed(1);
}

function cntdwn(){
    timer-=1;
    settimer(timer);
    if (timer<=0){
        clearInterval(intervalId);
        document.removeEventListener('mousemove', mouseListener);
        helloText.innerHTML="Конец игры, результат: "+score+ ".<br> нажмите enter.";
        helloText.style.display = "block";
        orange.style.display = "none";
        pig.style.display = "none";
        scoreObj.style.display = "none";
        timerObj.style.display = "none";
        document.addEventListener("keydown", enterListener);
    }
}


function startGame(event){
    if (event.keyCode ==32){
        score = 0;
        setScore(0);
        
        helloText.style.display = "none";
        scoreObj.style.display = "block";
        orange.style.display = "block";
        pig.style.display = "block";
     

        document.removeEventListener('keydown', enterListener);
        document.addEventListener("mousemove", mouseListener);

        timerObj.style.display = "block";
        timer=3;
        settimer(timer);
        intervalId = setInterval(
            function(){cntdwn();}, 1000
        );
    }
}

var mouseListener = function(event){mouseMoveFunc(event)};

function mouseMoveFunc(event){
pig.style.left=event.clientX - 64 + 'px' ;
pig.style.top=event.clientY - 64 + 'px' ;
checkCollision();
}

spawnOrange();
setScore(0);

function spawnOrange(){

orange.style.left=Math.random()*(window.innerWidth-128)+'px' ;
orange.style.top=Math.random()*(window.innerHeight-128) + 'px' ;
}

function checkCollision(){
    console.log();
    if (
        Math.sqrt(Math.pow(pig.offsetLeft - orange.offsetLeft,2) + Math.pow(pig.offsetTop - orange.offsetTop,2)) <128
    )
    {
        spawnOrange();
        score++;
        timer+=0.1;
        setScore(score);
    }
}

function setScore(scoreToSet){
    scoreObj.innerHTML = "Score: "+scoreToSet;
}

