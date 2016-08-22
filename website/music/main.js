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
var score = 0;


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
        game.load.image('instructions', 'assets/instructions_updated.png');   
        game.load.image('nextbutton', 'assets/nextbutton.png');
    },
    create: function(){
        
        //var blueBg = game.add.image(0, 0, 'bluebackground');
        background = game.add.tileSprite(0,0, 960, 550, 'instructions');  
		var nextButton = this.game.add.button(850, 65, 'nextbutton', this.gotoNext, this);
		nextButton.anchor.setTo(0.5, 0.5);
		nextButton.scale.setTo(0.95, 0.95);
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
         

},


 	create: function(){
        var desertPic = this.game.add.image(0,0,'desert');
        skinnyPlayer = game.add.sprite(375,350, 'skinnycactus');
        skinnyPlayer.scale.setTo(0.3, 0.3);
        

        //enable arcade functionality
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(skinnyPlayer, Phaser.Physics.ARCADE);
        

        skinnyPlayer.body.collideWorldBounds = true; //set screen boundariess
        skinnyPlayer.body.gravity.y = 1000;  //make the sprite fall to bottom of screen 
        cursors = game.input.keyboard.createCursorKeys(); //enable all arrow keys

       
        //random falling spiders 
        spiders = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var spider = spiders.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling drop
        drops = game.add.physicsGroup();
        for (var i = 0; i < 2; i++)
    	{
        var drop = spiders.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling chemical drop
    	chemicals = game.add.physicsGroup();
        for (var i = 0; i < 2; i++)
    	{
        var chemical = spiders.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling sun
    	suns = game.add.physicsGroup();
        for (var i = 0; i < 2; i++)
    	{
        var sun = spiders.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(80, 150);
    	}


},
  	update: function (){
  	
    spiders.forEach(checkPos, this);
    function checkPos(spider) {
    if (spider.y > 550){
      spider.y = -200;
        spider.x = game.world.randomX;
    }
 }


    skinnyPlayer.body.velocity.x = 0; //when nothing is pressed, sprite doesn't move
        if (cursors.left.isDown)
        {
           skinnyPlayer.body.velocity.x = -300; //left is down, sprite moves in neg direction

        }
        else if (cursors.right.isDown)
        {
          skinnyPlayer.body.velocity.x = 300; //right is down, sprite moves in pos direction
        }
 
}
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
         
         
},

    create: function(){
        var desertPic = this.game.add.image(0,0,'desert');
        scoreText= game.add.text(800, 20, 'score: 0',  { font: '34px Arial', fill: '#FFFFFF'});
        
        pricklyPlayer = game.add.sprite(375,350, 'pricklycactus');
        pricklyPlayer.scale.setTo(1, 1);

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

        for (var i = 0; i < 1; i++)
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
        for (var i = 0; i < 1; i++)
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
    
        pricklyPlayer.body.velocity.x = 0;

        if (cursors.left.isDown){
           pricklyPlayer.body.velocity.x = -200;
        } else if (cursors.right.isDown){
          pricklyPlayer.body.velocity.x = 200;
        }

       game.physics.arcade.overlap(pricklyPlayer, good_elements, collisionHandler, null, this);
       game.physics.arcade.overlap(pricklyPlayer, bad_elements, collisionHandler1, null, this);
    }
}
     function collisionHandler (pricklyPlayer, good_elements){
       good_elements.y = -100
       good_elements.x = game.world.randomX;
       score += 10;
       scoreText.text = 'score: ' + score;
        }     
  function collisionHandler1 (pricklyPlayer, bad_elements){
       bad_elements.y = -100
       bad_elements.x = game.world.randomX;
       score -= 20;
       scoreText.text = 'score: ' + score;
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
},
    
    create: function(){
        var desertPic = this.game.add.image(0,0,'desert');
        roundPlayer = game.add.sprite(375,350, 'roundcactus');
        roundPlayer.scale.setTo(0.3,0.3);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(roundPlayer, Phaser.Physics.ARCADE);
        roundPlayer.body.collideWorldBounds = true;
        roundPlayer.body.gravity.y = 1000;
        cursors = game.input.keyboard.createCursorKeys();

         //random falling spiders 
        spiders = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var spider = spiders.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling drop
        drops = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var drop = spiders.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling chemical drop
    	chemicals = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var chemical = spiders.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling sun
    	suns = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var sun = spiders.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(80, 150);
    	}       

    },

    update: function (){

    spiders.forEach(checkPos, this);
    function checkPos(spider) {

    if (spider.y > 550){
      spider.y = -200;
        spider.x = game.world.randomX;
    }
 }

    roundPlayer.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
           roundPlayer.body.velocity.x = -200;

        }
        else if (cursors.right.isDown)
        {
          roundPlayer.body.velocity.x = 200;
        }

    }

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
},
    create: function(){
        var desertPic = this.game.add.sprite(0,0,'desert');
        floweredPlayer = game.add.sprite(375,350, 'floweredcactus');
        floweredPlayer.scale.setTo(.75,.75);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(floweredPlayer, Phaser.Physics.ARCADE);
        floweredPlayer.body.collideWorldBounds = true;
        floweredPlayer.body.gravity.y = 100;
        cursors = game.input.keyboard.createCursorKeys(); 

// falling objects
         //random falling spiders 
        spiders = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var spider = spiders.create(game.world.randomX, -200, 'spider');
        spider.scale.setTo(0.4, 0.4);
        spider.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling drop
        drops = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < 2; i++)
    	{
        var drop = spiders.create(game.world.randomX, -200, 'drop');
        drop.scale.setTo(0.1, 0.1);
        drop.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling chemical drop
    	chemicals = game.add.physicsGroup();
        for (var i = 0; i < 2; i++)
    	{
        var chemical = spiders.create(game.world.randomX, -200, 'chemical');
        chemical.scale.setTo(0.09, 0.09);
        chemical.body.velocity.y = game.rnd.between(80, 150);
    	}

    	//random falling sun
    	suns = game.add.physicsGroup();
        for (var i = 0; i < 2; i++)
    	{
        var sun = spiders.create(game.world.randomX, -200, 'sun');
        sun.scale.setTo(0.1, 0.1);
        sun.body.velocity.y = game.rnd.between(80, 150);
    	}       


    },

    update: function (){

    spiders.forEach(checkPos, this);
    function checkPos(spider) {

    if (spider.y > 550){
      spider.y = -200;
        spider.x = game.world.randomX;
    }
 }

     floweredPlayer.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
           floweredPlayer.body.velocity.x = -200;

        }
        else if (cursors.right.isDown)
        {
          floweredPlayer.body.velocity.x = 200;
        }
 
}
}

// --- MAIN LOOP ---
var game = new Phaser.Game(960, 550, Phaser.CANVAS, 'gameDiv');
game.state.add('loadState', loadState);
game.state.add('instructionState', instructionState);
game.state.add('pickState', pickState);
game.state.add('skinnyState', skinnyState);
game.state.add('pricklyState', pricklyState);
game.state.add('roundState', roundState);
game.state.add('floweredState', floweredState);
game.state.start('loadState');
