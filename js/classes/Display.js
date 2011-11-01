function Display(id) {
	this.obj=document.getElementById(id);
	this.scoreDisp=document.getElementById("scoreDisp");
	this.scoreDisp2=document.getElementById("scoreDisp2");
	this.timeBar=document.getElementById("timeBar");
	this.console=document.getElementById("console");
	
	this.timeBar.style.height="2px";
	
	this.write=function(output,_col) {
		col=_col?_col:"#6f4";
		
		var now=new Date();
		var hours=now.getHours();
		var minutes=now.getMinutes();
		var seconds=now.getSeconds();
		if (hours<10)
			hours="0"+hours;
		if (minutes<10)
			minutes="0"+minutes;
		if (seconds<10)
			seconds="0"+seconds;
		
		//this.obj.innerHTML="<span style=\"color:#bbb\">"+hours+":"+minutes+":"+seconds+": </span>";
		this.console.innerHTML="<span style=\"color:"+col+"\">"+output+"<span>\n";
		this.console.scrollTop = this.console.scrollHeight;
	}
	
	this.clear=function() {
		this.timeBar.style.width="0px";
		this.scoreDisp2.parentNode.style.opacity=1;
		this.scoreDisp2.innerHTML='';
		this.scoreDisp.innerHTML='';
		this.console.innerHTML='';
	}
	
	this.update=function() {
		//Vis hvor lang tid der er tilbage
		this.timeBar.style.width=timeLeft/90000*this.timeBar.parentNode.style.width.replace("px","")+"px";
		
		//Vis points
		this.scoreDisp.innerHTML=ship.points;
		if (ship.points==0) {
			this.scoreDisp.innerHTML="0";
		}
		if (players==2) {
			this.scoreDisp2.parentNode.style.opacity=1;
			
			this.scoreDisp2.innerHTML=ship2.points;
		
			if (ship2.points==0) {
				this.scoreDisp2.innerHTML="0";
			}
		}
		else {
			this.scoreDisp2.parentNode.style.opacity=0.5;
		}
	}
}
