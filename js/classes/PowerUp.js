function PowerUp(_depth,_x,_y,_type) {
	this.type=_type?_type:"Battery";
	
	this.inheritFrom = SpaceObject;
	this.inheritFrom("img/"+theme+'/'+this.type+"."+themeExt,_depth,_x,_y,0,-60+Math.random()*120,-60+Math.random()*120);
	
	this.rotate=-0.5+Math.random()*1;
	
	this.step=function () {
		this.dir+=this.rotate;
	}
}
