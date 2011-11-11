//Loader bruges til at indlæse elementer, så de er cached.
//Loader kan indlæse billed- og lyfiler
function Loader() {
	this.sounds = new Object();
	this.images = new Object();
	this.loaded = new Object();
	this.loaded.images=0;
	this.loaded.sounds=0;
	
	this.loadImages=function(_paths) {
		for (var i in _paths) {
			var fPath='img/'+theme+'/'+_paths[i]+'.'+themeExt;
			this.images[fPath]=new Image;
			
			this.images[fPath].src=fPath;
			this.images[fPath].onload=function() {
				loader.loaded.images++;
				//display.write(this.loaded.images+"/"+Object.keys(this.images).length+" images has been loaded")
			}
		}
	}
	
	this.loadSounds=function(_paths) {
		for (var i in _paths) {
			var fPath=_paths[i];
			this.sounds[fPath]=new Audio(_paths[i]);
			this.sounds[fPath].addEventListener("canplaythrough",function() {
				loader.loaded.sounds++;
				//display.write(soundsLoaded+"/"+sounds.length+" sounds has been loaded");
			});
		}
	}
}