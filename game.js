var util = require("util"),
	express = require("express")
	app = express(), 
	http = require('http').Server(app), 
	io = require("socket.io")(http), 
	Player = require("./Player").Player;	//Externe Playerklasse
	
var socket, players;

function init(){
	players = [];
	http.listen(3000, function(){});
	app.use(express.static(__dirname + '/public'));
	setEventHandlers();
}

var setEventHandlers = function(){
	io.on("connection", onSocketConnection);
}

function onSocketConnection(socket){
	util.log("New Player has connected: " + socket.id);
	socket.on("disconnect", onClientDisconnect);
	socket.on("new player", onNewPlayer);
	socket.on("move player", onMovePlayer);
	socket.on("rotate player", onRotatePlayer);
}

function onClientDisconnect(){
	util.log("Player has disconnected: " + this.id);
	var removePlayer = playerById(this.id);
	
	if(!removePlayer){
		util.log("Player not found: " + this.id);
		return;
	};
	players.splice(players.indexOf(removePlayer), 1);
	this.broadcast.emit("remove Player", {id: this.id});	
}

function onNewPlayer(data){
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
	
	var i, existingPlayer;
	for(i = 0; i < players.length; i++){
		existingPlayer = players[i];
		console.log(i);
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	}
	players.push(newPlayer);
}

function onMovePlayer(data){
	var movePlayer = playerById(this.id);
	
	if(!movePlayer){
		util.log("Player not found: " + this.id);
		return;
	};
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);	
	
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
}

function onRotatePlayer(data){
	var rotatePlayer = playerById(this.id);
	
	if(!rotatePlayer){
		util.log("Player not found: " + this.is);
		return;
	};
	
	rotatePlayer.setAngle(data.angle);
	
	this.broadcast.emit("rotate player", {id: rotatePlayer.id, angle: rotatePlayer.getAngle()});
	
}
init();

function playerById(id){
	var i;
	for(i = 0; i < players.length; i++){
		if(players[i].id == id){
			return players[i];
		}
	}
	return false;
}