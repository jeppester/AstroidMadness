function Astroid(_depth,_type,_size,_x,_y,_dX,_dY) {
	this.type=_type?_type:"orange";
	this.size=_size?_size:3;
	_dX=_dX?_dX:0;
	_dY=_dY?_dY:0;
	
	//Lyde
	this.sfx=new Object();
	this.sfx.divide=new Audio(loader.sounds["sfx/astroid1.wav"].src);
	
	//Hvis x og y ikke er angivet, placér asteroiden udenfor banen (så den flyver ind)
	if (_x==undefined && _y==undefined) {
		switch (1+Math.floor(Math.random()*4)) {
			case 1:
				this.x=-32;
				this.y=Math.random()*arena.style.height.replace("px","")
			break;
			case 2:
				this.x=arena.style.width.replace("px","")*1+32;
				this.y=Math.random()*arena.style.height.replace("px","")
			break;
			case 3:
				this.x=Math.random()*arena.style.width.replace("px","")
				this.y=-32
			break;
			case 4:
				this.x=Math.random()*arena.style.width.replace("px","")
				this.y=arena.style.height.replace("px","")*1+32;
			break;
		}
	}
	else {
		this.x=_x;
		this.y=_y;
	}
	
	var sizeSpeed=0.66+1/this.size;
	
	
	this.inheritFrom= SpaceObject;
	this.inheritFrom('img/'+theme+"/astroids/"+this.size+"."+themeExt,_depth,this.x,this.y,0,_dX+sizeSpeed*(-60+Math.random()*120),_dY+sizeSpeed*(-60+Math.random()*120));
	
	this.rotate=-0.5+Math.random()*1;
	
	this.step=function () {
		this.dir+=this.rotate;
	}
	
	this.divide=function (_src) {
		if (this.size>1) {
			for (var i=0;i<2;i++) {
				new Astroid(4,this.type,this.size-1,this.x,this.y,this.dX,this.dY);
			}
		}
		
		switch(1+Math.floor(Math.random()*32)) {
			case 1:
			case 2:
				if (Object.keys(depth[2]).length<=maxPUs) {
					new PowerUp(2,this.x,this.y,"Battery");
				}
			break;
			case 3:
				if (Object.keys(depth[2]).length<=maxPUs) {
					new PowerUp(2,this.x,this.y,"Shield");
				}
			break;
			case 4:
				if (!_src.bulletPUExists && gameTime>40000*_src.bulletLevel-20000 && _src.bulletLevel!=4) {
					var p=new PowerUp(2,this.x,this.y,"BulletUpgrade"+(_src.bulletLevel+1));
					p.src=_src;
					_src.bulletPUExists=true;
				}
			break;
		}
		
		timeLeft+=(400-(_src.bulletLevel*75))/players;
		timeLeft=Math.floor(timeLeft);
		
		if (sfxOn) {
			this.sfx.divide.play();
		}
	}
}
