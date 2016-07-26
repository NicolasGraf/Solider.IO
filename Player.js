var Player = function(startX, startY){
	var x = startX,
		y = startY,
		angle,
		id;
	
	var getX = function(){
		return x;
	};
	
	var getY = function(){
		return y;
	};
	
	var setX = function(newX){
		x = newX;
	};
	
	var setY = function(newY){
		y = newY;
	};
	
	var setAngle = function(newAngle){
		angle = newAngle
	}
	
	var getAngle = function(){
		return angle;
	}

	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		getAngle: getAngle,
		setAngle: setAngle,
		id: id
	}
}

exports.Player = Player;