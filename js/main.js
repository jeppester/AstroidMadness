//Start med at sætte alle ting, der er konstante (dvs. ikke skal resettes når spillet skal genstartes)
//Sæt konstante variable
var loopSpeed=30;
var arena=document.getElementById('arena');
var maxPUs=5;

//Lav forskellige lag (med henvisninger til objekter)
var depth=new Array();
depth[0]=new Object();
depth[1]=new Object();
depth[2]=new Object();
depth[3]=new Object();
depth[4]=new Object();
depth[5]=new Object();

//Lav keyboard-index
var keys=new KeyIndex();
document.onkeydown=keys.onKeyDown;
document.onkeyup=keys.onKeyUp;

var players=1;
var pause=true;
var theme="6Colours";
var themeExt="png";

//Slå canvas til
var useCanvas=true;
var canvas,ctx;
if (useCanvas) {
	canvas=document.createElement("canvas");
	canvas.setAttribute('style',"position:absolute;left:0px;top:0px;");
	canvas.width=1024;
	canvas.height=574;
	arena.appendChild(canvas);
	ctx=canvas.getContext('2d');
}

//Lav Loader-object og indlæs ressurser
loader=new Loader();
loader.loadImages(new Array('SpaceShip','SpaceShip2','ShipShield','Shield','Battery','Bullet1','Bullet2','Bullet3','Bullet4','BulletUpgrade2','BulletUpgrade3','BulletUpgrade4','astroids/1','astroids/2','astroids/3'))
loader.loadSounds(new Array('sfx/astroid1.wav','sfx/explosion3.wav','sfx/shield2.wav','sfx/powerup2.wav','sfx/laser12.wav','sfx/laser22.wav','sfx/laser32.wav','sfx/laser42.wav'));

//Indlæs baggrundsmusik
var music=new Object();
music.bg=new Audio("music/spacemusic.wav");
music.bg.preload="auto";
var sfxOn=true;
var musicOn=true;

//Lav variable til test af fps
var frames=0;
var steps=0;

//Lav animator-objekt
var animator=new Animator();

music.bg.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
},false);

if (musicOn) {
	music.bg.addEventListener("canplaythrough",function() {music.bg.play();});
}

//Lav konsollen og displayet
var display=new Display('display');
var menu=new Menu('menu');

var last,gameTime,timeLeft,now,pause,curId,ship;

//Funktion til at fjerne alle objekter og spilstatistikker
function clearStage() {
	//Rens alle lag for objekter
	for (var i in depth) {
		for (var ii in depth[i]) {
			depth[i][ii].remove();
		}
	}
	
	last=new Date().getTime();
	gameTime=0;
	now=last;
	pause=1;
	curId=0;
	timeLeft=0;
}

//Funktion til at starte et nyt spil
function startGame(_players) {
	players=_players;
	clearStage();
	timeLeft=90000;
	pause=0;
	
	//Lav rumskibet
	ship=new SpaceShip("img/"+theme+"/SpaceShip."+themeExt,3,100,100);
	ship.spawn();
	if (_players==2) {
		ship.controls.shoot1=190;
		ship.controls.shoot2=188;
		//Lav spiller 2's rumskib
		ship2=new SpaceShip("img/"+theme+"/SpaceShip2."+themeExt,3,100,100,87,65,68,50,49);
		ship2.spawn();
	}
}

//Vis menuen
setTimeout("menu.showMain()",100);

//Start main-loop'et
setTimeout("mainLoop()",loopSpeed);

function mainLoop() {
	//Hent den nuværende tid, så alle bevægelser bliver relativt til tiden
	now=new Date().getTime();
	
	if (!pause) {
		//Udfør kollisionstjek i hver tredje frame
		var c=steps/2;
		if (c/Math.floor(c)==1) {
			for (var i in depth[3]) {
				depth[3][i].cols();
			}
			for (var i in depth[1]) {
				depth[1][i].cols();
			}
		}
		
		//Udfør update-funktioner
		for (var i in depth) {
			for (var ii in depth[i]) {
				depth[i][ii].update();
			}
		}
		
		//Opdatér animationer der kun foretages mens spillet kører
		animator.updateAll(0);
		
		aMax=Math.floor(5+(gameTime)/8500);
		if (Object.keys(depth[4]).length<aMax) {
			new Astroid(4);
		}
		
		gameTime+=now-last;
		timeLeft-=now-last;
		
		if (timeLeft<=0) {
			pause=true;
			timeLeft=0;
			menu.showGameEnd();
		}
		
		display.update();
		
		steps++;
	}
	
	//Opdatér animationer der kører hver gang en frame tegnes
	animator.updateAll(1);
	
	//Udfør draw-funktioner
	//Hvis der bruges canvas, clear det
	if (useCanvas) {
		ctx.clearRect (0,0,1024,574);
		
		for (var i in depth) {
			for (var ii in depth[i]) {
				depth[i][ii].drawCanvas();
			}
			frames++;
		}
	}
	else {
		for (var i in depth) {
			for (var ii in depth[i]) {
				depth[i][ii].drawHTML();
			}
			frames++;
		}
	}
	
	//Skriv fps
	//display.write(steps/gameTime*1000);
	
	if ((keys.down(27) || keys.down(80)) && timeLeft>0) {
		keys.keys[27]=0;
		keys.keys[80]=0;
		if (menu.visible==0 && !pause) {
			pause=1;
			menu.showInGame();
		}
	}
	
	//Sæt last til now, så last kan bruges i næste loop
	last=now;
	
	setTimeout("mainLoop()",loopSpeed);
}
