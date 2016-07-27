var Bullet = function(startX, startY, angle, dx, dy){
	var x = startX,
		y = startY,
		angle = angle,
		directionX = dx,
		directionY = dy,
		lifeTime
		alive = true;
	
	var getDx = function(){
		return directionX;
	};
	
	var getDy = function(){
		return directionY;
	};
	var getX = function(){
		return x;
	};
	
	var setLifeTime = function(time){
		lifeTime = time;
		if(lifeTime <= 0) alive = false;
	}
	
	var getY = function(){
		return y;
	};
	
	var setX = function(newX){
		x = newX;
	};
	
	var setY = function(newY){
		y = newY;
	};
	
	var getAngle = function(){
		return angle;
	}
	var isAlive = function(){
		return alive;
	}

	return {
		getX: getX,
		getY: getY,
		getDx: getDx,
		getDy: getDy,
		setX: setX,
		setY: setY,
		getAngle: getAngle

	}
}

exports.Bullet = Bullet;