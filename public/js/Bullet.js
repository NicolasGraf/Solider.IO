var Bullet = function(startX, startY, angle, directionX, directionY){
	var x = startX,
	y = startY,
	angle = angle,
	bulletImage,
	dx = directionX,
	dy = directionY,
	alive,
	velX,
	velY,
	speed,
	lifespan;
	
	var init= function(){
		bulletImage = new Image();
		bulletReady = false;
		bulletImage.onload = function(){
			bulletReady = true;
		}
		bulletImage.src = "./js/Images/bullet.png";	
		
		//Calculate velocity
		var deltaX = dx - x;
		var deltaY = dy - y;
		var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		var scale = 1 / magnitude;
		velX = deltaX * scale;
		velY = deltaY * scale;

		alive = true;
		speed = 10;
		lifespan = 100;
		console.log("Bullet fired");
	}
	
	var update = function(){		
		x += velX * speed;
		y += velY * speed;
		
		lifespan--;
		if(lifespan <= 0){
			alive = false;
		}
	}
	
	var draw = function(ctx){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);
		ctx.drawImage(bulletImage, -5, -50);	
		ctx.restore();
		this.update();			
	}
	var isAlive = function(){	
		return alive;
	}
	
	var collidedWith = function(playerX, playerY){
		if(playerX == x || playerY == x || playerX == y || playerY == y){
			console.log("hit");
			return true;
		} else{
			return false}
	}
	var getLifeTime = function(){
		return lifespan;
	}
	var getX = function(){
		return x;
	}
	var getY = function(){
		return y;
	}
	init();
	return{
		init: init,
		update: update,
		draw: draw,
		isAlive: isAlive,
		getLifeTime: getLifeTime,
		getX: getX,
		getY: getY
	}
}