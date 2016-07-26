
var Gun = function(parentPlayer){
	
	var x = parentPlayer.getX(),
		y = parentPlayer.getY(),
		ammo = parentPlayer.getAmmo(),
		carrier = parentPlayer,
		gunImage,
		aimX,
		lookingAngle,
		bullets,
		aimY;
		
	var init = function(){
		gunImage = new Image();
		gunReady = false;
		gunImage.onload = function(){
			gunReady = true;
		}
		gunImage.src = "./js/Images/gun.png";
		
		bullets = [];
	}
	
	
	var update = function(destX, destY, angle){
		x = destX;
		y = destY;
		lookingAngle = angle;
		
	}
	var draw = function(ctx){
		//Speichern bevor wir den context bewegen und rotieren
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(lookingAngle);		
		if(gunReady) ctx.drawImage(gunImage, -10, -50);

		//Wiederherstellen
		ctx.restore();
		for(var i = 0; i < bullets.length; i++){
			bullets[i].draw(ctx);
		}

	}
	var shoot = function(destX, destY){
		var deltaX = destX - x;
		var deltaY = destY - y;
		var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		var scale = 1 / magnitude;
		var velX = deltaX * scale;
		var velY = deltaY * scale;
		
		newBullet = new Bullet(this, velX, velY);
		bullets.push(newBullet);
		ammo -= 1;
		
		return newBullet;
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
	
	return {	
		draw: draw,
		update: update,
		shoot: shoot,
		bullets: bullets,
		getX: getX,
		getY: getY,
		getAngle: getAngle,
	}
	
}