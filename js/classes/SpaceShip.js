function SpaceShip(_src,_depth,_x,_y,_thrust,_left,_right,_shoot1,_shoot2) {
	this.inheritFrom= SpaceObject;
	this.inheritFrom(_src,_depth,_x,_y);
	
	//Forskellige spillervariable
	//Keys indeholder keyboardindstillinger
	this.controls=new Object();
	this.controls.thrust=_thrust?_thrust:38;
	this.controls.left=_left?_left:37;
	this.controls.right=_right?_right:39;
	this.controls.shoot1=_shoot1?_shoot1:32;
	this.controls.shoot2=_shoot2?_shoot2:17;
	
	//Scoreinformationer
	this.score=new Object();
	this.score.s1l1=0;
	this.score.s1l2=0;
	this.score.s1l3=0;
	this.score.s1l4=0;
	this.score.s2l1=0;
	this.score.s2l2=0;
	this.score.s2l3=0;
	this.score.s2l4=0;
	this.score.s3l1=0;
	this.score.s3l2=0;
	this.score.s3l3=0;
	this.score.s3l4=0;
	this.score.PU=0;
	this.points=0;
	
	//Lyde
	this.sfx=new Object();
	this.sfx.die=new Audio("sfx/explosion3.wav");
	this.sfx.PU=new Audio("sfx/powerup2.wav");
	
	//Spawnting
	this.spawned=false;
	this.deathTime=false;
	this.accel=300;
	this.bmSize=0;
	
	//Powerupting
	this.bulletLevel=1;
	this.bulletPUExists;
	this.shieldOn=false;
	this.shieldStart=now;
	this.shield=new Sprite('img/'+theme+"/ShipShield."+themeExt,5,this.x,this.y);
	this.shield.src=this
	this.shield.update=function() {
		this.bmSize=this.src.bmSize*1.8;
		this.x=this.src.x;
		this.y=this.src.y;
	};
	this.shield.update();
	this.shield.opacity=0;
	
	//Loaded og specialReady afgør om rumskibets våben er ladt
	this.loaded=true;
	this.specialReady=true;
	
	this.spawn=function() {
		if (timeLeft<=0) {
			return;
		}
		
		//Find en position hvor der ikke er asteroider
		var tries=0;
		do {
			if (tries==100) {
				break;
			}
			else {
				this.x=150+Math.random()*(arena.style.width.replace("px","")*1-300);
				this.y=150+Math.random()*(arena.style.height.replace("px","")*1-300);
			}
			tries++;
		}
		//Forsøg at finde et spawn-sted op til 100 gange, hvis det ikke lykkes ventes der på spillet.
		while (this.collisionCheck(4,150))
		
		if (tries<100) {
			if (sfxOn) {
				this.sfx.PU.play();
			}
			display.write("Space Ship ready!");
			//this.bmSize=32;
			this.dX=this.dY=0;
			this.dir=Math.random()*360;
		
			//Opdatér billedet
			this.update();
			
			//Fade skibet ind
			this.animate("bmSize",32,400,"pause=false",false);
		
			//Sæt spawned til true, der kan nu spilles videre
			this.spawned=true;
			
			pause=true;
		}
		else {
			setTimeout("depth["+this.depth+"]['"+this.id+"'].spawn()",20);
		}
	}
	
	this.die=function() {
		this.dX=this.dY=0;
		this.animate("bmSize",0,200);
		this.shield.animate("opacity",0,300,"",false);
		this.shieldOn=false;
		this.spawned=false;
		this.deathTime=gameTime;
		
		//Lav explosionslyd
		if (sfxOn) {
			this.sfx.die.play();
		}
	}
	
	this.accelerate=function (_dir,_amount) {
		dirRad=_dir * Math.PI/180;
		/*SKAL FORBEDRES!*/fpsAcc=_amount/(1000/loopSpeed);
		
		this.dX+=fpsAcc * Math.cos(dirRad);
		this.dY+=fpsAcc * Math.sin(dirRad);
	}
	
	this.collisionCheck=function(_depth,safeDist) {
		d=_depth?_depth:4;
		safeDist=safeDist ? safeDist : 0;
	
		for (i in depth[d]) {
			var cObj=depth[d][i];
			if (cObj.alive) {
				//Udregn afstanden til rumskibet
				var dist=Math.sqrt((cObj.x-this.x)*(cObj.x-this.x)+(cObj.y-this.y)*(cObj.y-this.y));
		
				dist-=this.bmSize/2+cObj.bmSize/2;
		
				if (dist<safeDist) {
					return true;
				}
			}
		}
		return false;
	}
	
	this.PUCollisionCheck=function () {
		for (i in depth[2]) {
			var cObj=depth[2][i];
			if (cObj.alive) {
				//Udregn afstanden til rumskibet
				var dist=Math.sqrt((cObj.x-this.x)*(cObj.x-this.x)+(cObj.y-this.y)*(cObj.y-this.y));
			
				dist-=this.bmSize/2+cObj.bmSize/2;
			
				if (dist<0) {
					this.points+=1000;
					this.score.PU++;
				
					switch(cObj.type) {
						case "Battery":
							cObj.remove();
							this.resize(12);
							if (sfxOn) {
								this.sfx.PU.play();
							}
						break;
						case "Shield":
							cObj.remove();
							this.shieldOn=true;
							this.shieldStart=now;
							this.shield.animate('opacity',1,100);
							if (sfxOn) {
								this.sfx.PU.play();
							}
						break;
						case "BulletUpgrade2":
							if (this.bulletLevel==1) {
								cObj.remove();
								this.bulletLevel++;
								this.bulletPUExists=false;
								if (sfxOn) {
									this.sfx.PU.play();
								}
							}
						break;
						case "BulletUpgrade3":
							if (this.bulletLevel==2) {
								cObj.remove();
								this.bulletLevel++;
								this.bulletPUExists=false;
								if (sfxOn) {
									this.sfx.PU.play();
								}
							}
						break;
						case "BulletUpgrade4":
							if (this.bulletLevel==3) {
								cObj.remove();
								this.bulletLevel++;
								this.bulletPUExists=false;
								if (sfxOn) {
									this.sfx.PU.play();
								}
							}
						break;
					}
				}
			}
		}
	}
	
	this.ACollisionCheck=function () {
		for (i in depth[4]) {
			var cObj=depth[4][i];
			if (cObj.alive) {
				//Udregn afstanden til rumskibet
				var dist=Math.sqrt((cObj.x-this.x)*(cObj.x-this.x)+(cObj.y-this.y)*(cObj.y-this.y));
			
				dist-=this.bmSize/2+cObj.bmSize/2;
			
				if (dist<0) {
					if (this.shieldOn) {
						if (sfxOn) {
							cObj.sfx.shield.play();
						}
					
						cObj.remove();
					}
					else {
						//Bounce rumskibet
						var rDX,rDY,cDir,mDir,imp,aSpeed,sSpeed;
				
						//Beregn vinklen mellem rumskibet og asteroiden
						cDir=Math.atan2(this.y-cObj.y,this.x-cObj.x);
				
						//Udregn rumskibets hastighed relativt til asteroiden
						rDX=this.dX-cObj.dX;
						rDY=this.dY-cObj.dY;
				
						//Beregn impulsen
						imp=Math.sqrt(rDY*rDY+rDX*rDX)
				
						//Beregn rumskibets bevægelsesretning
						mDir=Math.atan2(rDY,rDX);
				
						//Sæt asteroidens nye retning og fart;
						aSpeed=Math.cos(cDir-mDir)*imp;
						cObj.dX+=(1/cObj.size)*aSpeed*Math.cos(cDir);
						cObj.dY+=(1/cObj.size)*aSpeed*Math.sin(cDir);
				
						this.die();
						break;
					}
				}
			}
		}
	}
	
	this.resize=function (dSize) {
		var curSize;
		if (animator.animations[0][this.id]) {
			var a=animator.animations[0][this.id];
			curSize=a.b+a.c;
		}
		else {
			curSize=this.bmSize;
		}
		
		if (curSize+dSize<10) {
			this.die();
		}
		else {
			this.animate('bmSize',Math.min(38,curSize+dSize),200,"",1,"quadOut")
		}
	}
	
	this.cols=function() {
		if (this.spawned) {
			//Tjek om skibet kolliderer med asteroider
			this.ACollisionCheck();
			//Tjek om skibet kolliderer med powerups
			this.PUCollisionCheck();
		}
	}
	
	this.step=function () {
		if (this.spawned) {
			//Tjek efter tastaturevents
			if (keys.down(this.controls.thrust)) {
				this.accelerate(this.dir,this.accel);
			}
			if (keys.down(this.controls.left)) {
				this.dir-=5*loopSpeed/30;
			}
			if (keys.down(this.controls.right)) {
				this.dir+=5*loopSpeed/30;
			}
			if (keys.down(this.controls.shoot1)) {
				if (this.loaded) {
					new Bullet(this,1,this.x,this.y,this.dir,this.dX,this.dY,10000,this.bulletLevel);
					this.loaded=false;
					this.accelerate(this.dir-180,this.accel*0.5)
					this.resize(-1);
					setTimeout("depth["+this.depth+"]['"+this.id+"'].loaded=true",200);
				}
			}
			
			//Ildring
			if (keys.down(this.controls.shoot2)) {
				if (this.specialReady) {
					for (var i=0;i<10;i++) {
						new Bullet(this,1,this.x,this.y,i*36+this.dir,this.dX,this.dY,10000,this.bulletLevel);
					}
					this.specialReady=false;
					this.resize(-15);
					setTimeout("depth["+this.depth+"]['"+this.id+"'].specialReady=true",1000);
				}
			}
			
			//Opdatér skibets skjold
			if (this.shieldOn && now>this.shieldStart+10000) {
				this.shieldOn=false;
				this.shield.animate("opacity",0,200);
			}
		}
		else {
			if (this.deathTime) {
				if (gameTime-this.deathTime>5000) {
					this.deathTime=false;
					this.spawn();
				}
				else {
					display.write("Spaceship destroyed, respawning in "+Math.ceil(5-(gameTime-this.deathTime)/1000)+" seconds!","#F33");
				}
			}
		}
	}
}
