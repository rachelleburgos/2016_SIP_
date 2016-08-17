

var backgroundv;
var startButton;
var nextButton;
var background;


var loadState = { // on load, with scrolling clouds and start button
    preload: function(){
        game.load.image('clouds', 'assets/clouds.gif');   
        game.load.image('startbutton', 'assets/start_button.png')
        game.load.image('splash', 'assets/start_logo.png')
    },
    create: function(){
        
        sky = game.add.tileSprite(0,0, 960, 550, 'clouds');       		
        this.splash = game.add.image (240, 30, 'splash')
       	this.splash.scale.setTo(0.65, 0.65);
       	var startButton = this.game.add.button(495,475,'startbutton',this.playTheGame,this);
		startButton.anchor.setTo(0.5, 0.5);
		startButton.scale.setTo(0.75, 0.75);

	},
	playTheGame: function(){
		this.game.state.start("instructionState");
	},
	update: function(){
    	sky.tilePosition.x += 5;
    }
}



// --- INSTRUCTIONS PG ---

var instructionState = { // state where you cactus is chosen, after enter is pressed
    preload: function() {
        game.load.image('bluebackground', 'assets/bluebackground.png');   
        game.load.image('nextbutton', 'assets/nextbutton.png');
    },
    create: function(){
        
        //var blueBg = game.add.image(0, 0, 'bluebackground');
        background = game.add.tileSprite(0,0, 960, 550, 'bluebackground');  
		var nextButton = this.game.add.button(850,450, 'nextbutton', this.gotoNext, this);
		nextButton.anchor.setTo(0.5, 0.5);
	},

        gotoNext: function(){
        	this.game.state.start("pickState");

		},
	update: function() {
    }
}



// --- PICK CACTUS PAGE ---
var pickState = { // state where you cactus is chosen, after enter is pressed
    preload: function() {

        game.load.image('skinnycactus', 'assets/skinnycactus.png');  
        game.load.image('floweredcactus', 'assets/floweredcactus.png');
        game.load.image('pricklycactus', 'assets/pricklycactus.png');
        game.load.image('roundcactus', 'assets/roundcactus.png');
        game.load.image('bluebackground', 'assets/bluebackground.png'); 
    },
    create: function(){
       	background = game.add.tileSprite(0,0, 960, 550, 'bluebackground');
       
       // skinny cactus
        var skinnycactus = this.game.add.button(200,300, 'skinnycactus', this.gotoSkinny, this);
		skinnycactus.anchor.setTo(0.5, 0.5);
		skinnycactus.scale.setTo(0.5, 0.5);
	 
  	   // prickly cactus 
		var pricklycactus = this.game.add.button(400,300, 'pricklycactus', this.gotoPrickly, this);
		pricklycactus.anchor.setTo(0.5, 0.5);
		pricklycactus.scale.setTo(1, 1);

		// round cactus 
		var roundcactus = this.game.add.button(600,300, 'roundcactus', this.gotoRound, this);
		roundcactus.anchor.setTo(0.5, 0.5);
		roundcactus.scale.setTo(0.5, 0.5);

		//flowered cactus 
		var floweredcactus = this.game.add.button(800,300, 'floweredcactus', this.gotoFlowered, this);
		floweredcactus.anchor.setTo(0.5, 0.5);
		floweredcactus.scale.setTo(0.5, 0.5);

	  },
	  
	gotoSkinny: function(){
        	this.game.state.start("skinnyState");
	  
	},
	
	gotoPrickly: function(){
        	this.game.state.start("pricklyState");
	
	},
	gotoRound: function(){
        	this.game.state.start("roundState");

	},
    gotoFlowered: function(){
    		this.game.state.start("floweredState")
    },
}




//make skinny, prickly, round, flowered States: have the same game loop within each, only difference is
//that the cactus sprites are different 

// --- MAIN LOOP ---
var game = new Phaser.Game(960, 550, Phaser.CANVAS, 'gameDiv');
game.state.add('loadState', loadState);
game.state.add('instructionState', instructionState);
game.state.add('pickState', pickState);
game.state.start('loadState');