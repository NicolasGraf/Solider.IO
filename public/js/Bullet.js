var Bullet = function(parentGun, directionX, directionY){
	var x = parentGun.getX(),
	y = parentGun.getY(),
	angle = parentGun.getAngle(),
	bulletImage,
	dx = directionX,
	dy = directionY,
	rotated = false,
	lifespan;
	
	var init= function(){
		bulletImage = new Image();
		bulletReady = false;
		bulletImage.onload = function(){
			bulletReady = true;
		}
		bulletImage.src = "./js/Images/bullet.png";
		console.log(x, y);
	}
	
	var update = function(){		
		x += dx;
		y += dy;
	}
	
	var draw = function(ctx){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);
		
		ctx.drawImage(bulletImage, x, y);
		ctx.restore();
		this.update();
		rotated = true;
		
	}
	init();
	return{
		init: init,
		update: update,
		draw: draw
	}
}