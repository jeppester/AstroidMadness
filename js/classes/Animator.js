//animationator håndterer animationer
function Animator () {
	var this.animations=new Array();
	this.animations.push(new Object(),new Object());
	
	//Function til at opdatere alle animationer
	this.updateAll=function(layer) {
		//layer angiver hvilket animationslag der skal køres
		//i lag 0 køres de animationer der skal opdateres i hvert step i spillet
		//i lag 1 køres de animationer der skal opdateres i hver frame (dvs. også selv om spillet er på pause)
		layer=layer ? layer : 0
		for (var i in this.animations[layer]) {
			this.update(this.animations[layer][i],layer);
		}
	}
	
	this.update=function (animation,layer) {
		var a=animation;
		var obj=a.obj;
		var t;
		
		if (layer==0) {
			t=gameTime-a.start;
		}
		else {
			t=(new Date().getTime())-a.start;
		}
		
		if (t>a.d) {
			if (step) {
				delete animations[layer][obj.id];
			}
			else {
				delete animations[layer][obj.id];
			}	
			obj[a.prop]=a.b+a.c;
			eval(a.onEnd);
		}
		else {
			obj[a.prop]=this.ease(a.easing,t,a.b,a.c,a.d);
		}
	}
	
	//ease bruges til at udregne easing af animationerne
	this.ease=function(type,t,b,c,d,verb) {
		switch (type) {
			case "linear":
				t/=d
				return b+c*t;
			break;
			case "quadIn":
				t/=d
				return b+c*t*t;
			break;
			case "quadOut":
				t/=d
				return b-c*t*(t-2);
			break;
			case "quadInOut":
				t=t/d*2;
				if (t<1) {
					return b+c*t*t/2;
				}
				else {
					t--;
					return b+c*(1-t*(t-2))/2;
				}
			break;
			case "powerIn":
				t/=d;
				
				//a angiver om c er positiv eller negativ
				a=c/Math.abs(c);
				
				return b+a*Math.pow(Math.abs(c),t);
			break;
			case "powerOut":
				t/=d;
				
				//a angiver om c er positiv eller negativ
				a=c/Math.abs(c);
				
				return b+c-a*Math.pow(Math.abs(c),1-t);
			break;
			case "powerInOut":
				t=t/d*2;
				
				//a angiver om c er positiv eller negativ
				a=c/Math.abs(c);
				
				if (t<1) {
					return b+a*Math.pow(Math.abs(c),t)/2;
				}
				else {
					t--;
					return b+c-a*Math.pow(Math.abs(c),1-t)/2;
				}
			break;
			case "sinusInOut":
				t/=d
				return b+c*(1+Math.cos(Math.PI*(1+t)))/2;
			break;
		}
	}
}