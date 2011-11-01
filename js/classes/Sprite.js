//En sprite er et objekt med en bitmap, med en bestemt rotation
//Alle grafiske objekter i spillet arver fra Sprite-klassen
function Sprite(_src,_depth,_x,_y,_dir) {
	this.x= _x ? _x : 50;
	this.y= _y ? _y : 50;
	this.dir=_dir ? _dir : 0;
	this.depth=_depth ? _depth : 0;
	this.id="obj"+curId;
	curId++
	
	if (!useCanvas) {
		this.bm=new Image();
		this.bm.src=img[_src].src;
		this.bm.style.position="absolute";
	}
	else {
		this.bm=img[_src];
	}
	this.bmSize=this.bm.width;
	this.opacity=1;
	depth[this.depth][this.id]=this;
	
	if (!useCanvas) {
		this.bm.style.zIndex=this.depth;
		this.bm.style.top=this.y-this.bm.width/2+"px";
		this.bm.style.left=this.x-this.bm.height/2+"px";
		this.bm.style.webkitTransform="rotate("+this.dir+"deg)";
		this.bm.style.msTransform="rotate("+this.dir+"deg)";
		this.bm.style.MozTransform="rotate("+this.dir+"deg)";
	}
	
	//Update sørger for at Sprite'en såfremt den position ændres, opdateres på skærmen
	this.update =function() {
	};
	
	this.cols =function() {
	};
	
	this.remove = function() {
		this.purge();
	};
	
	this.purge=function() {
		if (!useCanvas) {
			$(this.bm).remove();
		}
		delete depth[this.depth][this.id].bm;
		delete depth[this.depth][this.id];
	}
	
	this.drawHTML=function () {
		//Opdatér spriten med HTML
		this.bm.style.width=this.bmSize+"px";
		this.bm.style.height=this.bmSize+"px";
		this.bm.style.opacity=this.opacity;
		this.bm.style.webkitTransform="rotate("+this.dir+"deg)";
		this.bm.style.MozTransform="rotate("+this.dir+"deg)";
		this.bm.style.msTransform="rotate("+this.dir+"deg)";
		this.bm.style.top=this.y-this.bmSize/2+"px";
		this.bm.style.left=this.x-this.bmSize/2+"px";
	}
	this.drawCanvas=function() {
		//Tegn spriten på canvas
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.globalAlpha=this.opacity;
		ctx.rotate(this.dir*Math.PI/180);
		ctx.drawImage(this.bm,-this.bmSize/2,-this.bmSize/2,this.bmSize,this.bmSize);
		ctx.restore();
	}
	
	if (!useCanvas) {
		arena.appendChild(this.bm);
	}
	
	this.animate=function (_prop,_to,_dur,_onEnd,_step,_easing) {
		var anim=new Object();
		_step=_step!=undefined?_step:1;
		
		anim.onEnd=_onEnd?_onEnd:"";
		anim.easing=_easing?_easing:"quadInOut";
		
		anim.prop=_prop;
		anim.obj=this;
		
		anim.d=_dur;
		anim.b=this[anim.prop];
		anim.c=_to-anim.b;
		
		if (_step) {
			if (stepAnims[this.id]!=undefined) {
				delete stepAnims[this.id];
			}
			
			anim.start=gameTime;
			animator.animations[1][this.id]=anim;
		}
		else {
			if (frameAnims[this.id]!=undefined) {
				delete frameAnims[this.id];
			}
			
			anim.start=new Date().getTime();
			animator.animations[1][this.id]=anim;
		}
	}
}
