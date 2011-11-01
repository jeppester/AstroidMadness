function Menu(id) {
	this.box=document.getElementById(id);
	this.visible=0;
	
	this.showMain=function() {
		clearStage();
		var HTML="";
		HTML+='<h1 style="color:#F33;">Welcome to Astroid Madness</h1>';
		HTML+='<p style="color:#48F;">Destroy as many astroids as you can in 90 seconds!<p/>';
		HTML+='<p style="color:#48F;">You get points and extra time for each astroid you destroy</p>';
		HTML+='<h2>';
		HTML+='<a onclick="menu.showInstructions()">-> Controls/Power-ups</a><br/>';
		HTML+='<a onclick="menu.showHighScore()">-> High scores</a><br/>';
		HTML+='<a onclick="startGame(1);menu.hide()">-> Start single player game</a><br/>';
		HTML+='<a onclick="startGame(2);menu.hide()">-> Start two player game</a>';
		HTML+='</h2>';
		
		HTML+='<div style="position:absolute;bottom:2px;right:2px;text-align:right;"><label for="tM">Music: </label><input id="tM" style="vertical-align:middle" '+(musicOn?'checked="checked"':'')+' onclick="if(this.checked){music.bg.play();musicOn=true;}else{music.bg.pause();musicOn=false;}" type="checkbox" /><br/> <label for="tS">Sounds: </label><input id="tS" style="vertical-align:middle" '+(sfxOn?'checked="checked"':'')+' onclick="if(this.checked){sfxOn=true;}else{sfxOn=false;}" type="checkbox" /></div>';
		
		this.show(HTML);
	}
	
	this.showInstructions=function() {
		clearStage();
		var HTML="";
		HTML+='<h1 style="color:#F33;">Controls/Power-ups</h1>';
		HTML+='<div>'
		HTML+='<table style="float:left;color:#6F4;border-collapse:collapse;width:240px;">';
		HTML+='<tr style="color:#F33;"><th colspan="2"><h2 style="color:#48F;margin:5px 0 5px 0;">Singleplayer controls</h2></th></tr>';
		HTML+='<tr style="color:#48F;"><th style="text-align:left;">Action</th><th style="width:120px;text-align:right;">Key</th></tr>';
		
		HTML+='<tr><td style="text-align:left;">Accelerate</td><td style="text-align:right;">ARROW UP</td></tr>';
		HTML+='<tr><td style="text-align:left;">Rotate Left</td><td style="text-align:right;">LEFT ARROW</td></tr>';
		HTML+='<tr><td style="text-align:left;">Rotate right</td><td style="text-align:right;">RIGHT ARROW</td></tr>';
		HTML+='<tr><td style="text-align:left;">Fire</td><td style="text-align:right;">SPACE</td></tr>';
		HTML+='<tr><td style="text-align:left;">Special fire</td><td style="text-align:right;">CTRL</td></tr>';
		
		HTML+='</table>';
		
		HTML+='<table style="float:right;color:#6F4;border-collapse:collapse;width:240px;">';
		HTML+='<tr style="color:#F33;"><th colspan="2"><h2 style="color:#48F;margin:5px 0 5px 0;">Multiplayer controls</h2></th></tr>';
		HTML+='<tr style="color:#48F;"><th style="text-align:left;">Action</th><th style="width:120px;text-align:right;">Key</th></tr>';
		
		HTML+='<tr><td style="text-align:left;">P1 Fire</td><td style="text-align:right;">.</td></tr>';
		HTML+='<tr><td style="text-align:left;">P1 Special fire</td><td style="text-align:right;">,</td></tr>';
		HTML+='<tr><td colspan="2" style="height:10px;"></td></tr>';
		HTML+='<tr><td style="text-align:left;">P2 Accelerate</td><td style="text-align:right;">W</td></tr>';
		HTML+='<tr><td style="text-align:left;">P2 Rotate Left</td><td style="text-align:right;">A</td></tr>';
		HTML+='<tr><td style="text-align:left;">P2 Rotate right</td><td style="text-align:right;">D</td></tr>';
		HTML+='<tr><td style="text-align:left;">P2 Fire</td><td style="text-align:right;">2</td></tr>';
		HTML+='<tr><td style="text-align:left;">P2 Special fire</td><td style="text-align:right;">1</td></tr>';
		
		HTML+='</table><br style="clear:both;"/>';
		
		HTML+='</div>';
		
		HTML+='<h2 style="color:#48F;margin-bottom:5px;">Power-ups</h2>';
		
		HTML+='<table cellspacing="5" border="0" style="font-size:12px;float:right;color:#6F4;width:100%;">';
		HTML+='<tr></tr>';
		
		HTML+='<tr><td><img src="img/'+theme+'/Battery.'+themeExt+'" /></td><td><img src="img/'+theme+'/Shield.'+themeExt+'" /></td><td><img src="img/'+theme+'/BulletUpgrade2.'+themeExt+'" /><img src="img/'+theme+'/BulletUpgrade3.'+themeExt+'" /><img src="img/'+theme+'/BulletUpgrade4.'+themeExt+'" /></td></tr>';
		
		HTML+='<tr><td>Firing will slowly drain the ship, making it smaller. Collect batteries to recharge the ship.</td><td>Shield power-ups surround the ship with a protective shield. A shield lasts for 5 seconds.</td><td>Weapon power-ups improve the ship\\\'s firing mechanism, making the bullets faster and stronger</td></tr>';
		
		HTML+='</table><br style="clear:both;"/>';
		
		HTML+="<h2>"
		HTML+='<a onclick="menu.showMain()">-> Back</a><br/>';
		HTML+='</h2>';
		
		this.show(HTML);
	}
	
	this.showInGame=function() {
		var HTML="";
		HTML+='<h1 style="color:#F33;">Game paused</h1>';
		HTML+='<h2>';
		HTML+='<a onclick="startGame(players);menu.hide()">-> Restart game</a><br/>';
		HTML+='<a onclick="menu.showMain()">-> Go to main menu</a><br/>';
		HTML+='<a onclick="menu.hide();pause=0;">-> Resume game</a><br/>';
		HTML+='</h2>';
		HTML+='<div style="position:absolute;bottom:2px;right:2px;text-align:right;"><label for="tM">Music: </label><input id="tM" style="vertical-align:middle" '+(musicOn?'checked="checked"':'')+' onclick="if(this.checked){music.bg.play();musicOn=true;}else{music.bg.pause();musicOn=false;}" type="checkbox" /><br/> <label for="tS">Sounds: </label><input id="tS" style="vertical-align:middle" '+(sfxOn?'checked="checked"':'')+' onclick="if(this.checked){sfxOn=true;}else{sfxOn=false;}" type="checkbox" /></div>';
		
		this.show(HTML);
	}
	
	this.showGameEnd=function() {
		$.post('php/getScores.php', function(data) {
			var HTML='<h1 style="color:#F33;">GAME OVER</h1>';
			var tPoints,cPoints
			if (players==1) {
				tPoints=ship.points;
				cPoints=data.singleplayer[9].score;
				
				HTML+='<p style="color:#48F;">Final score: <b>'+ship.points+ "</b><p>";
			}
			else {
				tPoints=ship.points+ship2.points;
				cPoints=data.multiplayer[9].score;
				
				//Lav en tekst efter hvilken spiller der fik flest points
				var text;
				if (ship.points==ship2.points) {
					text="Both players finished with a score of "+ship.points;
				}
				else if (ship.points>ship2.points) {
					text="P1 got the highest score with "+ship.points+" points";
				}
				else {
					text="P2 got the highest score with "+ship2.points+" points";
				}
				HTML+='<p style="color:#48F;">'+text+'</b><p>';
				HTML+='<p style="color:#48F;">Your total score is: <b>'+tPoints+ "</b><p>";
			}
			
			if (tPoints>cPoints) {
				if (players==1) {
					HTML+='<p style="color:#48F;">Congratulations!<br/>You\'ve got a high score!</p>';
					HTML+='<p style="color:#6F4;">';
					HTML+='<input style="border:2px solid #333;background-color:#000;color:inherit;font:inherit;" id="playername" type="text" onfocus="if(this.value=\'Enter your name\')this.value=\'\'" value="Enter your name"/>';
				}
				else {
					HTML+='<p style="color:#48F;">Congratulations!<br/>Your total score is on the top ten!</p>';
					HTML+='<p style="color:#6F4;">';
					HTML+='<input style="border:2px solid #333;background-color:#000;color:inherit;font:inherit;" id="playername" type="text" onfocus="if(this.value=\'Enter your team name\')this.value=\'\'" value="Enter your team name"/>';
				}
				HTML+='<input style="border:2px solid #333;background-color:#000;color:#999;font:inherit;" onclick="submitScore(ship);" name="playername" type="button" value="Submit"/>';
				HTML+='</p>';
			}
			else {
				HTML+='<p style="color:#48F;">You score didn\'t make to the top ten</p>';
			}
			
			HTML+='<h2>';
			HTML+='<a onclick="startGame(players);menu.hide()">-> Restart game</a><br/>';
			HTML+='<a onclick="menu.showMain()">-> Go to main menu</a><br/>';
			HTML+='</h2>';
			
			menu.show(HTML);
		},"json");
	}
	
	this.showHighScore=function() {
		clearStage();
		$.post('php/getScores.php', function(data) {
			var HTML='<h1 style="color:#F33;">High Scores</h1>';
			HTML+='<div>'
			HTML+='<table style="float:left;color:#6F4;border-collapse:collapse;width:240px;">';
			HTML+='<tr style="color:#F33;"><th colspan="2"><h2 style="color:#48F;margin:5px;">Singleplayer</h2></th></tr>';
			HTML+='<tr style="color:#48F;"><th style="text-align:left;">Player</th><th style="width:70px;text-align:right;">Score</th></tr>';
			
			for (var i in data.singleplayer) {
				HTML+='<tr style="border-top:2px solid #333;"><td style="text-align:left;">'+data.singleplayer[i].playername+'</td><td style="text-align:right;">'+data.singleplayer[i].score+'</td></tr>';
			}
			
			HTML+='</table>';
			
			HTML+='<table style="float:right;color:#6F4;border-collapse:collapse;width:240px;">';
			HTML+='<tr style="color:#F33;"><th colspan="2"><h2 style="color:#48F;margin:5px;">Multiplayer</h2></th></tr>';
			HTML+='<tr style="color:#48F;"><th style="text-align:left;">Team</th><th style="width:70px;text-align:right;">Score</th></tr>';
			
			for (var i in data.multiplayer) {
				HTML+='<tr style="border-top:2px solid #333;"><td style="text-align:left;">'+data.multiplayer[i].playername+'</td><td style="text-align:right;">'+data.multiplayer[i].score+'</td></tr>';
			}
			
			HTML+='</table><br style="clear:both;"/>';
			
			HTML+='</div>';
			HTML+='<h2>';
			HTML+='<a onclick="menu.showMain()">-> Go to main menu</a><br/>';
			HTML+='</h2>';
			
			menu.show(HTML);
		},"json");
	}
	
	this.show=function(message) {
		if (this.visible) {
			this.hide();
			setTimeout("menu.show('"+message+"')",400);
		}
		else {
			this.visible=1;
			this.box.innerHTML=message;
			nH=$(this.box).innerHeight();
			$(this.box).animate({top:287-(nH/2)},400);
		}
	}
	
	this.hide=function() {
		this.visible=0;
		$(this.box).animate({top:arena.style.height},400);
	}
}
