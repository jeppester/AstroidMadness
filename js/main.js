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

//Lav animationsarray
stepAnims=new Object();
frameAnims=new Object();

//Lav keyboard-index
var keys=new KeyIndex();
document.onkeydown=keys.onKeyDown;
document.onkeyup=keys.onKeyUp;

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

//Lyd
music=new Object();
music.bg=new Audio("music/spacemusic.wav");
music.bg.preload="auto";
sfxOn=true;
musicOn=true;

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

var players=1;
var pause=true;
var theme="6Colours";
var themeExt="png";

var last,gameTime,timeLeft,now,pause,curId,ship;

//Funktion til at loade sprites
var imgLoaded=0;
var img=new Object();
function loadSprites(_paths) {
	for (var i in _paths) {
		var fPath='img/'+theme+'/'+_paths[i]+'.'+themeExt;
		img[fPath]=new Image;
		
		img[fPath].src=fPath;
		img[fPath].onload=function() {
			imgLoaded++;
			display.write(imgLoaded+"/"+Object.keys(img).length+" images has been loaded")
		}
	}
}

//Load alle billeder
loadSprites(new Array('SpaceShip','SpaceShip2','ShipShield','Shield','Battery','Bullet1','Bullet2','Bullet3','Bullet4','BulletUpgrade2','BulletUpgrade3','BulletUpgrade4','astroids/1','astroids/2','astroids/3'));

//Funktion til at loade lyde
var soundsLoaded=0;
var sounds=new Array();
function loadSounds(_paths) {
	for (var i in _paths) {
		sounds.push(new Audio(_paths[i]));
		sounds[sounds.length-1].addEventListener("canplaythrough",function() {
			soundsLoaded++;
			//display.write(soundsLoaded+"/"+sounds.length+" sounds has been loaded");
		});
	}
}

//Load alle lyde
loadSounds(new Array('sfx/astroid1.wav','sfx/explosion3.wav','sfx/shield2.wav','sfx/powerup2','sfx/laser12.wav','sfx/laser22.wav','sfx/laser32.wav','sfx/laser42.wav'));

//Funktion til at starte et nyt spil
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
	
	//display.clear();
}

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

function submitScore() {
	pn=document.getElementById('playername')?document.getElementById('playername').value:"Johnny";
	
	if (pn=="" || pn=="Enter your name" || pn=="Enter your team name") {
		display.write('No name entered');
		return;
	}
	
	var s=new Object();
	s.players=players;
	s.ship1=ship.score
	s.ship1.points=ship.points;
	s.time=gameTime;
	s.playername=pn;
	
	if (players==2) {
		s.ship2=ship2.score
		s.ship2.points=ship2.points;
	}
	
	$.post("php/checkScore.php",s,function(data) {
		if (data=="1") {
			display.write('High score saved!');
			menu.showHighScore();
		}
		else {
			menu.show('<h1 style="color:#F33;">CHEATER!</h1>');
		}
	});
}

//Lav animator-objekt
var animator=new Animator();

//Vis menuen
setTimeout("menu.showMain()",100);

//Start main-loop'et
setTimeout("mainLoop()",loopSpeed);

var frames=0;
var steps=0;

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
	display.write(steps/gameTime*1000);
	
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
