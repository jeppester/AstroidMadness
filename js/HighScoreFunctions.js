function submitScore() {
	pn=document.getElementById('playername')?document.getElementById('playername').value:"Johnny";
	
	if (pn=="" || pn=="Enter your name" || pn=="Enter your team name") {
		display.write('No name entered');
		return;
	}
	
	var s=new Object();
	s.players=players;
	s.ship1=ship.score
	s.ship1.points=ship.points;
	s.time=gameTime;
	s.playername=pn;
	
	if (players==2) {
		s.ship2=ship2.score
		s.ship2.points=ship2.points;
	}
	
	$.post("php/checkScore.php",s,function(data) {
		if (data=="1") {
			display.write('High score saved!');
			menu.showHighScore();
		}
		else {
			menu.show('<h1 style="color:#F33;">CHEATER!</h1>');
		}
	});
}