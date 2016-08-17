// --- MAIN PROGRAM ---
var sky;
var backgroundv;

var gamearea_height = 550;
var gamearea_width  = 950;

var gamearea_hori_startbtn = 335; // X coordinates of start button
var gamearea_vert_startbtn = 350; // Y coordinates of start button

var mainState = {
	preload: function() { // PRELOADS THE IMAGES NEEDED
		game.load.image('clouds', 'assets/background_titlescreen.png');
		game.load.image('startbutton', 'assets/start_button.png');
	},

	create: function() { // PLACES ON SCREEN
		sky = game.add.tileSprite(0, 0, gamearea_width, gamearea_height, 'clouds');
		this.startbutton = this.game.add.sprite(gamearea_hori_startbtn, gamearea_vert_startbtn, 'startbutton');
	},
	update: function() { //REFRESHES SCREEN
		sky.tilePosition.x += 5;
	}
}

var game = new Phaser.Game (gamearea_width, gamearea_height, Phaser.AUTO, 'gameDiv');
game.state.add('mainState', mainState);
game.state.start('mainState');