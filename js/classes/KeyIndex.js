//Lav array der lagrer information om alle taster
function KeyIndex () {
	this.keys= new Array();
	
	for (i=0;i<150;i++) {
		this.keys[i]=0;
	}
	
	this.onKeyDown=function(event) {
		//display.write(event.keyCode);
		if (keys.keys[event.keyCode]==0) {
			keys.keys[event.keyCode]=2;
		}
		else {
			keys.keys[event.keyCode]=1;
		}
	}
	this.onKeyUp=function(event) {
		keys.keys[event.keyCode]=0;
	}
	
	this.down=function (key) {
		if (this.keys[key]==1 || this.keys[key]==2) {
			return true;
		}
		else {
			return false;
		}
	}
	this.pressed=function (key) {
		if (this.keys[key]==2) {
			return true;
		}
		else {
			return false;
		}
	}
	
	this.stat=function (key) {
		return this.keys[key];
	}
}
