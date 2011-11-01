function Bullet(_src,_depth,_x,_y,_dir,_dX,_dY,_speed,_level) {
	//Skuddets level (afgør om det kan penetrere flere asteroider af gangen);
	this.level=_level?_level:1;
	this.src=_src;
	this.inheritFrom= SpaceObject;
	this.inheritFrom("img/"+theme+"/Bullet"+this.level+"."+themeExt,_depth,_x,_y,_dir,_dX,_dY);
	
	//Lyde
	this.sfx=new Object();
	this.sfx.fire=new Audio("sfx/laser"+this.level+"2.wav");
	if (sfxOn) {
		this.sfx.fire.play();
	}
	
	//Tilføj objektets afskydningshastighed, til dets nuværende
	dirRad=this.dir * Math.PI/180;
	this.dX+=(0.90+this.level/10)*_speed/(1000/loopSpeed)*Math.cos(dirRad);
	this.dY+=(0.90+this.level/10)*_speed/(1000/loopSpeed)*Math.sin(dirRad);
	
	//Skuddets liv i ms
	this.startLife=1000;
	this.life=1000;
	
	this.cols=function() {
		//Check om skudet støder sammen med asteroider
		this.astroidCollision();
	}
	
	this.step=function () {
		//Fade skuddet ud
		this.life-=loopSpeed;
		this.opacity=(this.life)/this.startLife*0.8+0.2;
		
		//Fjern skuddet når det er nået en bestemt distance
		if (this.life<0) {
			this.remove();
		}
	}
	
	this.astroidCollision=function(safeDist) {
		safeDist=safeDist ? safeDist : 0;
		for (var i in depth[4]) {
			var cObj=depth[4][i];
			if (cObj.alive) {
				//Udregn afstanden mellem objekterne
				var dist=Math.sqrt((cObj.x-this.x)*(cObj.x-this.x)+(cObj.y-this.y)*(cObj.y-this.y));
			
				dist-=this.bmSize/2+cObj.bmSize/2;
			
				if (dist<safeDist) {
					cObj.divide(this.src);
					cObj.remove();
					this.src.points+=1000-200*cObj.size;
					this.src.score["s"+cObj.size+"l"+this.src.bulletLevel]++;
					this.src.resize(1);
					this.life-=1000/(this.level);
				}
			}
			if (this.life<0) {
				this.remove();
				break;
			}
		}
	}
	
	
}
