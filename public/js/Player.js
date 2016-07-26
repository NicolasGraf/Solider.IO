/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		gun,
		ammo,
		lookingAngle,
		playerImage,
		moveAmount = 2;
		
	var getX = function(){
		return x;
	};
	
	var getY = function(){
		return y;
	};
		
	var setX = function(newX){
		x = newX;
		gun.update(x, y, lookingAngle);
	};
	
	var setY = function(newY){
		y = newY;
		gun.update(x, y, lookingAngle);
	};

	var update = function(keys) {
		// Up key takes priority over down
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};
		
		gun.update(x, y, lookingAngle);
		
		
	};

	var draw = function(ctx) {		
		if(playerReady) ctx.drawImage(playerImage, x-25, y-25);
		gun.draw(ctx);
		
	};
	var init = function(){
		playerImage = new Image();
		playerReady = false;
		playerImage.src = "./js/Images/green.png";
		playerImage.onload = function(){
			playerReady = true;
		}		
		gun = new Gun(this);
		ammo = 100;
	};
	
	var getAngle = function(){
		return lookingAngle;
	}
	var setAngle = function(angle){
		lookingAngle = angle;
		gun.update(x, y, lookingAngle);
	}
	
	var shootAt = function(x, y){		
		var tempBullet = gun.shoot(x, y);
		return tempBullet;
	}
	var getAmmo = function(){
		return ammo;
	}

	return {
		update: update,
		draw: draw,
		init: init,
		getAngle: getAngle,
		setAngle: setAngle,
		getAmmo: getAmmo,
		shootAt: shootAt,
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY
	}
};