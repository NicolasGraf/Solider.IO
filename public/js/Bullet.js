var Bullet = function(parentGun, directionX, directionY){
	var x = parentGun.getX(),
	y = parentGun.getY(),
	angle = parentGun.getAngle(),
	bulletImage,
	dx = directionX,
	dy = directionY,
	alive,
	speed,
	lifespan;
	
	var init= function(){
		bulletImage = new Image();
		bulletReady = false;
		bulletImage.onload = function(){
			bulletReady = true;
		}
		bulletImage.src = "./js/Images/bullet.png";		
		alive = true;
		speed = 10;
		lifespan = 30;
		console.log("Bullet fired");
	}
	
	var update = function(){		
		x += dx * speed;
		y += dy * speed;
		lifespan--;
		console.log(alive);
		console.log(lifespan);
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
	init();
	return{
		init: init,
		update: update,
		draw: draw,
		isAlive: isAlive
	}
}