var backgroundv;
var startButton;
var nextButton;
var background;
var good_elements;
var bad_elements;
var sun;
var spider;
var chemical;
var scoreText;
var score = 50;
var endScreen;
var playAgain;
var updated_score;

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
		this.game.state.start("introState");
	},
	update: function(){
    	sky.tilePosition.x += 5;
    }
}
// intro page
var introState = {
    
    preload: function() {
    game.load.image('intro', 'assets/intro.png');
    game.load.image('nextbutton', 'assets/nextbutton.png');
    },
    
    create: function(){
        background = game.add.tileSprite(0,0, 960, 550, 'intro');
        var nextButton = this.game.add.button(800, 425, 'nextbutton', this.gotoInstruct, this);
    },
    
    gotoInstruct: function(){
        this.game.state.start("instructionState");
    },
    
    update: function(){
    }
}

// --- INSTRUCTIONS PG ---
var instructionState = { // state where you cactus is chosen, after enter is pressed
    preload: function() {
        game.load.image('instructions', 'assets/instructions_updated.png');   
        game.load.image('nextbutton', 'assets/nextbutton.png');
    },
    create: function(){
        
        //var blueBg = game.add.image(0, 0, 'bluebackground');
        background = game.add.tileSprite(0,0, 960, 550, 'instructions');  
		var nextButton = this.game.add.button(850, 450, 'nextbutton', this.gotoNext, this);
		nextButton.anchor.setTo(0.5, 0.5);
		nextButton.scale.setTo(1, 1);
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
        game.load.image('pickacactus', 'assets/pick_a_cactus.png'); 
    },
    create: function(){
        background = game.add.tileSprite(0,0, 960, 550, 'pickacactus');
       
       // skinny cactus
        var skinnycactus = this.game.add.button(120,268, 'skinnycactus', this.gotoSkinny, this);
		skinnycactus.anchor.setTo(0.5, 0.5);
		skinnycactus.scale.setTo(0.45, 0.45);
	 
  	   // prickly cactus 
		var pricklycactus = this.game.add.button(360,300, 'pricklycactus', this.gotoPrickly, this);
		pricklycactus.anchor.setTo(0.5, 0.5);
		pricklycactus.scale.setTo(1.3, 1.3);

		// round cactus 
		var roundcactus = this.game.add.button(580,260, 'roundcactus', this.gotoRound, this);
		roundcactus.anchor.setTo(0.5, 0.5);
		roundcactus.scale.setTo(1.2, 1.2);

		//flowered cactus 
		var floweredcactus = this.game.add.button(815,300, 'floweredcactus', this.gotoFlowered, this);
		floweredcactus.anchor.setTo(0.5, 0.5);
		floweredcactus.scale.setTo(1.1, 1.1);

	  },
	  
	gotoSkinny: function(){
        	this.game.state.start('skinnyState');
	},
	
	gotoPrickly: function(){
        	this.game.state.start('pricklyState');
	
	},
	gotoRound: function(){
        	this.game.state.start('roundState');

	},
    gotoFlowered: function(){
    		this.game.state.start('floweredState');
    }
}




//make skinny, prickly, round, flowered States: have the same game loop within each, only difference is
//that the cactus sprites are different 
// --- game screen for skinny cactus --- 
var skinnyState = {
 	preload: function() {
         game.load.image('skinnycactus', 'assets/skinnycactus.png');  
         game.load.image('desert', 'assets/desert.png');
         game.load.image('spider', 'assets/spidey.png');
         game.load.image('drop', 'assets/water_drop.png');
         game.load.image('chemical', 'assets/chemicals.png');
         game.load.image('sun', 'assets/sun.png');
         game.load.image('heart', 'assets/heart.png');
        
         

},

 	create: function(){
        score = 50;
        var desertPic = this.game.add.image(0,0,'desert');
        scoreText= game.add.text(720, 20, 'Positivity: 50%',  { font: '34px Arial', fill: '#FFFFFF'});
        skinnyPlayer = game.add.sprite(375,350, 'skinnycactus');
        skinnyPlayer.scale.setTo(0.3, 0.3);
        heart= game.add.sprite(670,21, 'heart');
        heart.scale.setTo(0.08, 0.08);


        //enable arcade functionality
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(skinnyPlayer, Phaser.Physics.ARCADE);
        

        skinnyPlayer.body.collideWorldBounds = true; //set screen boundariess
        skinnyPlayer.body.gravity.y = 1000;  //make the sprite fall to bottom of screen 
        cursors = game.input.keyboard.createCursorKeys(); //enable all arrow keys

       
        //random falling spiders 
        good_elements = game.add.physicsGroup();
        bad_elements = game.add.physicsGroup();

        for (var i = 0; i < 2; i++)
        {
        spider = bad_elements.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(100, 200);
        }

        //random falling drop
        for (var i = 0; i < 2; i++)
        {
        drop = good_elements.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(90, 150);
        }

        //random falling chemical drop
        //chemicals = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 1; i++)
        {
        chemical = bad_elements.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(120, 150);
        }

        //random falling sun
        //suns = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 1; i++)
        {
        sun = good_elements.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(90, 150);

        }       

  },
    update: function (){

        good_elements.forEach(checkPos, this);
        bad_elements.forEach(checkPos, this);
    
        function checkPos(spider) {
            if (spider.y > 750){
                spider.y = -200;
                spider.x = game.world.randomX;
            } 
        }
    
        skinnyPlayer.body.velocity.x = 0;

        if (cursors.left.isDown){
           skinnyPlayer.body.velocity.x = -300;
        } else if (cursors.right.isDown){
          skinnyPlayer.body.velocity.x = 300;
        }

       game.physics.arcade.overlap(skinnyPlayer, good_elements, collisionHandler, null, this);
       game.physics.arcade.overlap(skinnyPlayer, bad_elements, collisionHandler1, null, this);

       if (score <= 0){
            this.game.state.start('gameoverState');
        }
       if (score >= 100){
            this.game.state.start('youwinState');
       }

    }
}
     function collisionHandler (skinnyPlayer, good_elements){
       good_elements.y = -100
       good_elements.x = game.world.randomX;
       score += 5;
       scoreText.text = 'Positivity: ' + score + '%';

        }     
  function collisionHandler1 (skinnyPlayer, bad_elements){
       bad_elements.y = -100
       bad_elements.x = game.world.randomX;
       score -= 10;
       scoreText.text = 'Positivity: ' + score + '%'; 
   }     

     
//--- game screen for prickly cactus ---
var pricklyState = {
    preload: function() {
         game.load.image('pricklycactus', 'assets/pricklycactus.png');  
         game.load.image('desert', 'assets/desert.png');
         game.load.image('spider', 'assets/spidey.png');
         game.load.image('drop', 'assets/water_drop.png');
         game.load.image('chemical', 'assets/chemicals.png');
         game.load.image('sun', 'assets/sun.png');
         game.load.image('heart', 'assets/heart.png');
         
},

    create: function(){
        score = 50;
        var desertPic = this.game.add.image(0,0,'desert');
        scoreText= game.add.text(720, 20, 'Positivity: 50%',  { font: '34px Arial', fill: '#FFFFFF'});
        
        pricklyPlayer = game.add.sprite(375,350, 'pricklycactus');
        pricklyPlayer.scale.setTo(1, 1);
        heart= game.add.sprite(670,21, 'heart');
        heart.scale.setTo(0.1, 0.1);

       // game.physics.startSystem(Phaser.Physics.ARCADE);
       // game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.arcade.enable(pricklyPlayer);
        pricklyPlayer.body.collideWorldBounds = true;
        pricklyPlayer.body.gravity.y = 1000;
        cursors = game.input.keyboard.createCursorKeys();

// falling objects
        //random falling spiders 
        good_elements = game.add.physicsGroup();
        bad_elements = game.add.physicsGroup();

        for (var i = 0; i < 2; i++)
    	{
        spider = bad_elements.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(100, 150);
    	}

    	//random falling drop
        for (var i = 0; i < 1; i++)
    	{
        drop = good_elements.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(100, 170);
    	}

    	//random falling chemical drop
    	//chemicals = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 1; i++)
    	{
        chemical = bad_elements.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(100, 150);
    	}

    	//random falling sun
    	//suns = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        sun = good_elements.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(120, 180);

    	}       

  },
    
    update: function (){

        good_elements.forEach(checkPos, this);
        bad_elements.forEach(checkPos, this);
    
        function checkPos(spider) {
            if (spider.y > 750){
                spider.y = -200;
                spider.x = game.world.randomX;
            } 
        }
    
        pricklyPlayer.body.velocity.x = 0;

        if (cursors.left.isDown){
           pricklyPlayer.body.velocity.x = -300;
        } else if (cursors.right.isDown){
          pricklyPlayer.body.velocity.x = 300;
        }

       game.physics.arcade.overlap(pricklyPlayer, good_elements, collisionHandler, null, this);
       game.physics.arcade.overlap(pricklyPlayer, bad_elements, collisionHandler1, null, this);

       if (score <= 0){
            this.game.state.start('gameoverState');
        }
       if (score >= 100){
            this.game.state.start('youwinState');
       }

    }
}
     function collisionHandler (pricklyPlayer, good_elements){
       good_elements.y = -100
       good_elements.x = game.world.randomX;
       score += 5;
       scoreText.text = 'Positivity: ' + score + '%';
        }     
  function collisionHandler1 (pricklyPlayer, bad_elements){
       bad_elements.y = -100
       bad_elements.x = game.world.randomX;
       score -= 10;
       scoreText.text = 'Positivity: ' + score + '%';
        }     



//--- game screen for round cactus ---
var roundState = {
    preload: function() {
         game.load.image('roundcactus', 'assets/roundcactus.png');  
         game.load.image('desert', 'assets/desert.png');
         game.load.image('spider', 'assets/spidey.png');
         game.load.image('drop', 'assets/water_drop.png');
         game.load.image('chemical', 'assets/chemicals.png');
         game.load.image('sun', 'assets/sun.png');
         game.load.image('heart', 'assets/heart.png');
},
    
    create: function(){
        score = 50;
        var desertPic = this.game.add.image(0,0,'desert');
        scoreText= game.add.text(720, 20, 'Positivity: 0',  { font: '34px Arial', fill: '#FFFFFF'});
        roundPlayer = game.add.sprite(375,350, 'roundcactus');
        roundPlayer.scale.setTo(0.8,0.8);
        heart= game.add.sprite(670,21, 'heart');
        heart.scale.setTo(0.1, 0.1);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(roundPlayer, Phaser.Physics.ARCADE);
        roundPlayer.body.collideWorldBounds = true;
        roundPlayer.body.gravity.y = 1000;
        cursors = game.input.keyboard.createCursorKeys();

         //random falling spiders 
        good_elements = game.add.physicsGroup();
        bad_elements = game.add.physicsGroup();

        for (var i = 0; i < 2; i++)
        {
        spider = bad_elements.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(80, 150);
        }

        //random falling drop
        for (var i = 0; i < 1; i++)
        {
        drop = good_elements.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(80, 150);
        }

        //random falling chemical drop
        //chemicals = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 1; i++)
        {
        chemical = bad_elements.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(80, 150);
        }

        //random falling sun
        //suns = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
        {
        sun = good_elements.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(80, 150);

        }       

  },
    
    update: function (){

        good_elements.forEach(checkPos, this);
        bad_elements.forEach(checkPos, this);
    
        function checkPos(spider) {
            if (spider.y > 750){
                spider.y = -200;
                spider.x = game.world.randomX;
            } 
        }
    
       roundPlayer.body.velocity.x = 0;

        if (cursors.left.isDown){
           roundPlayer.body.velocity.x = -300;
        } else if (cursors.right.isDown){
          roundPlayer.body.velocity.x = 300;
        }

       game.physics.arcade.overlap(roundPlayer, good_elements, collisionHandler, null, this);
       game.physics.arcade.overlap(roundPlayer, bad_elements, collisionHandler1, null, this);

       if (score <= 0){
            this.game.state.start('gameoverState');
        }
       if (score >= 100){
            this.game.state.start('youwinState');
       }

    }
}
     function collisionHandler (roundPlayer, good_elements){
       good_elements.y = -100
       good_elements.x = game.world.randomX;
       score += 5;
       scoreText.text = 'Positivity: ' + score + '%';
        }     
  function collisionHandler1 (roundPlayer, bad_elements){
       bad_elements.y = -100
       bad_elements.x = game.world.randomX;
       score -= 10;
       scoreText.text = 'Positivity: ' + score + '%'; 
   }     


//-- game screen for flowered cactus ---
var floweredState = {
    preload: function() {
         game.load.image('floweredcactus', 'assets/floweredcactus.png');  
         game.load.image('desert', 'assets/desert.png');
         game.load.image('spider', 'assets/spidey.png');
         game.load.image('drop', 'assets/water_drop.png');
         game.load.image('chemical', 'assets/chemicals.png');
         game.load.image('sun', 'assets/sun.png');
         game.load.image('heart', 'assets/heart.png');
},
    create: function(){
        score = 50;
        var desertPic = this.game.add.sprite(0,0,'desert');
        scoreText= game.add.text(720, 20, 'Positivity: 50%',  { font: '34px Arial', fill: '#FFFFFF'});
        floweredPlayer = game.add.sprite(375,350, 'floweredcactus');
        floweredPlayer.scale.setTo(.75,.75);
        heart= game.add.sprite(670,21, 'heart');
        heart.scale.setTo(0.1, 0.1);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(floweredPlayer, Phaser.Physics.ARCADE);
        floweredPlayer.body.collideWorldBounds = true;
        floweredPlayer.body.gravity.y = 100;
        cursors = game.input.keyboard.createCursorKeys(); 


         //random falling spiders 
        good_elements = game.add.physicsGroup();
        bad_elements = game.add.physicsGroup();

        for (var i = 0; i < 2; i++)
        {
        spider = bad_elements.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(90, 150);
        }

        //random falling drop
        for (var i = 0; i < 1; i++)
        {
        drop = good_elements.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(100, 150);
        }

        //random falling chemical drop
        //chemicals = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
        {
        chemical = bad_elements.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(100, 200);
        }

        //random falling sun
        //suns = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 1; i++)
        {
        sun = good_elements.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(120, 150);

        }       

  },
    
    update: function (){

        good_elements.forEach(checkPos, this);
        bad_elements.forEach(checkPos, this);
    
        function checkPos(spider) {
            if (spider.y > 750){
                spider.y = -200;
                spider.x = game.world.randomX;
            } 
        }
    
       floweredPlayer.body.velocity.x = 0;

        if (cursors.left.isDown){
           floweredPlayer.body.velocity.x = -300;
        } else if (cursors.right.isDown){
          floweredPlayer.body.velocity.x = 300;
        }

       game.physics.arcade.overlap(floweredPlayer, good_elements, collisionHandler, null, this);
       game.physics.arcade.overlap(floweredPlayer, bad_elements, collisionHandler1, null, this);

       if (score <= 0){
            this.game.state.start('gameoverState');
        }
       if (score >= 100){
            this.game.state.start('youwinState');
       }

    }
}
     function collisionHandler (floweredPlayer, good_elements){
       good_elements.y = -100
       good_elements.x = game.world.randomX;
       score += 5;
       scoreText.text = 'Positivity: ' + score + '%';
        }     
  function collisionHandler1 (floweredPlayer, bad_elements){
       bad_elements.y = -100
       bad_elements.x = game.world.randomX;
       score -= 10;
       scoreText.text = 'Positivity: ' + score + '%'; 
}
//game over page
var gameoverState = {
    preload: function() {
        game.load.image('gameoverscreen', 'assets/game_over.png'); 
        game.load.image('playagain', 'assets/play_again.png');
    },
    create: function(){
        endScreen = this.game.add.sprite(0,0,'gameoverscreen'); 
        playAgain=  this.game.add.button(450,350, 'playagain', this.playAgainf, this);
    },
    playAgainf: function(){
        score= 0;
        this.game.state.start('pickState');
    }
}
// you win page
var youwinState = {
    preload: function() {
        game.load.image('playagainscreen', 'assets/game_win.png'); 
        game.load.image('playagain', 'assets/play_again.png');
    },
    create: function(){
        endScreen = this.game.add.sprite(0,0,'playagainscreen'); 
        playAgain=  this.game.add.button(350,380, 'playagain', this.playAgainf, this);
    },
    playAgainf: function(){
        score=0;
        this.game.state.start('pickState');
    }
}



// --- MAIN LOOP ---
var game = new Phaser.Game(960, 550, Phaser.CANVAS, 'gameDiv');
game.state.add('loadState', loadState);
game.state.add('introState', introState);
game.state.add('instructionState', instructionState);
game.state.add('pickState', pickState);
game.state.add('skinnyState', skinnyState);
game.state.add('pricklyState', pricklyState);
game.state.add('roundState', roundState);
game.state.add('floweredState', floweredState);
game.state.add('gameoverState', gameoverState);
game.state.add('youwinState', youwinState);
game.state.start('loadState');
