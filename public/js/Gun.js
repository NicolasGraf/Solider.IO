
var Gun = function(parentPlayer){
	carrier = parentPlayer;
	
	var	x,
		y,
		rounds,
		gunImage,
		aimX,
		lookingAngle,
		aimY;
		
	var init = function(){
		gunImage = new Image();
		gunReady = false;
		gunImage.onload = function(){
			gunReady = true;
		}
		gunImage.src = "./js/Images/gun.png";
		carrier.getX();
	}	
	
	var update = function(parentPlayer){
		carrier = parentPlayer;
		x = carrier.getX();
		y = carrier.getY();
		rounds = carrier.getAmmo();
		lookingAngle = carrier.getAngle();
	}
	var draw = function(ctx){
		//Speichern bevor wir den context bewegen und rotieren		
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(lookingAngle);		
		if(gunReady) ctx.drawImage(gunImage, -10, -50);
		//Wiederherstellen
		ctx.restore();
	}
	var shoot = function(destX, destY){
		rounds -= 1;
		
		return new Bullet(x, y, lookingAngle, destX, destY);
	}
	init();
	
	var getX = function(){
		return x;
	}
	var getY = function(){
		return y;
	}
	var getAngle = function(){
		return lookingAngle;
	}
	var setAngle = function(angle){
		lookingAngle = angle;
	}
	
	return {	
		draw: draw,
		update: update,
		shoot: shoot,
		getX: getX,
		getY: getY,
		getAngle: getAngle,
	}
	
}