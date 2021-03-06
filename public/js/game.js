/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ghostCanvas,
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	//Andere Spieler
	socket,			
	mouseX,
	mouseY,
	mouseAngle,
	flyingBullets;

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("topLayer");
	ghostCanvas = document.getElementById("botLayer");
	
	ctx = canvas.getContext("2d");

	// Erstmal
	canvas.width = 800;
	canvas.height = 600;
	
	//Potenzielle zweite Layer
	ghostCanvas.width = 800;
	ghostCanvas.height = 600;
	

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = Math.round(Math.random()*(canvas.width-5)),
		startY = Math.round(Math.random()*(canvas.height-5));

	// Initialise the local player
	localPlayer = new Player(startX, startY);
	localPlayer.init();
	
	
	socket = io.connect();
	
	remotePlayers = [];
	flyingBullets = [];
	
	// Start listening for events
	setEventHandlers();	
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);
	addEventListener("mousemove", function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
		updateAngle();
	}, false);
	
	addEventListener("mousedown", function(e){
		shooting = true;
		var aimX = e.clientX - ((window.innerWidth - 800) / 2);
		var aimY = e.clientY;
		var tempBullet = localPlayer.shootAt(aimX, aimY);
		flyingBullets.push(tempBullet);
		socket.emit("new bullet", {x: localPlayer.getX(), y: localPlayer.getY(), angle: localPlayer.getAngle(), dx: aimX, dy: aimY});		
		
	}, false);
	
	addEventListener("mouseup", function(e){
		shooting = false;
	}, false);
	

	
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("new player", onNewPlayer);
	socket.on("move player", onMovePlayer);
	socket.on("remove Player", onRemovePlayer);
	socket.on("rotate player", onRotatePlayer);
	socket.on("new Bullet", onNewBullet);
	socket.on("update Bullet", function(){});
	
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

function onSocketConnected(){
	console.log("Connected to socket server");
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});
}

function onSocketDisconnect(){
	console.log("Disconnected from socket server");

}

function onNewPlayer(data){
	console.log("New player connected: " + data.id);
	
	var newPlayer = new Player(data.x, data.y);
	newPlayer.init();
	newPlayer.id = data.id;
	remotePlayers.push(newPlayer);
}

function onMovePlayer(data){
	var movePlayer = playerById(data.id);
	
	if(!movePlayer){
		console.log("Player not found: " + data.id);
		return;
	};
	
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
}

function onRotatePlayer(data){
	var rotatePlayer = playerById(data.id);
	
	if(!rotatePlayer){
		console.log("Player not found: " + data.id);
		return;
	};
	
	rotatePlayer.setAngle(data.angle);
	
}

function onNewBullet(data){
	var newBullet = new Bullet(data.x, data.y, data.angle, data.dx, data.dy);
	console.log(data.x, data.y, data.angle, data.dx, data.dy);
	flyingBullets.push(newBullet);
	console.log(flyingBullets.length);
}

function onRemovePlayer(data){
	var removePlayer = playerById(data.id);
	
	if(!removePlayer) {
		util.log("Player not found: " + data.id);
		return;
	};
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
	
}

function updateAngle(){	
		//Correct Mouse Position
		var aimX = mouseX - ((window.innerWidth - 800) / 2);
		var aimY = mouseY;
		//Calc Angle to Player
		mouseAngle = Math.atan2(aimX - localPlayer.getX(), localPlayer.getY() - aimY);
		
	}

/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
	
	if((ghostCanvas.width || canvas.width) != 800){
		canvas.width = 800;
		canvas.height = 600;
		ghostCanvas.width = 800;
		ghostCanvas.height = 600;
	}
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	
	this.updateAngle();
	localPlayer.setAngle(mouseAngle);
	localPlayer.update(keys);	

	socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
	socket.emit("rotate player", {angle: localPlayer.getAngle()});
	
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player and his gun
	localPlayer.draw(ctx);
	localPlayer.getGun().draw(ctx);
	//Draw remoteplayers and their guns
	for(var i = 0; i < remotePlayers.length; i++){
		remotePlayers[i].draw(ctx);
		remotePlayers[i].getGun().draw(ctx);
	};
	//Draw all the Bullets flying around
	for(var i = 0; i < flyingBullets.length; i++){
		if(flyingBullets[i].isAlive() == true){
			flyingBullets[i].draw(ctx);
		} else{
			console.log("Bullet removed");
			flyingBullets.splice(i, 1);
		}
	}
	
};

function playerById(id){
	var i;
	for(i = 0; i < remotePlayers.length; i++){
		if(remotePlayers[i].id == id){
			return remotePlayers[i];
		}
	}
	return false;
};