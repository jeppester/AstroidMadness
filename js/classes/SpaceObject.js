//SpaceObject er en klasse til alle objekter med sprites, som bevæger sig i rummet
function SpaceObject(_src,_depth,_x,_y,_dir,_dX,_dY) {
	this.inheritFrom= Sprite;
	this.inheritFrom(_src,_depth,_x,_y,_dir);
	
	//Tilføj bevægelsesvarible
	this.dX= _dX ? _dX : 0;
	this.dY= _dY ? _dY : 0;
	this.alive=true;
	
	this.remove=function (time) {
		if (this.alive) {
			this.alive=false;
			time=time?time:200;
			this.animate("bmSize",0,time,"depth["+this.depth+"]['"+this.id+"'].purge()",1);
		}
	}
	
	this.update=function () {
		if (this.alive) {
			//Kør funktion til tilføjelse af yderligere til update(), kaldet "step";
			this.x+=this.dX*(now-last)/1000;
			this.y+=this.dY*(now-last)/1000;
			
			this.step();
			if (this.bm==undefined) {
				return;
			}
			
			//Tjek om objektet forlader arenaen
			if (this.x+this.bm.width/2<0) {
				this.x=arena.style.width.replace("px","")*1+this.bm.width/2;
			}
			if (this.y+this.bm.height/2<0) {
				this.y=arena.style.height.replace("px","")*1+this.bm.height/2;
			}
			if (this.x-this.bm.width/2>arena.style.width.replace("px","")*1) {
				this.x=-this.bm.width/2;
			}
			if (this.y-this.bm.height/2>arena.style.height.replace("px","")*1) {
				this.y=-this.bm.height/2;
			}
		}
	}
	this.step= function() {}
}
