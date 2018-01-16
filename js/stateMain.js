var StateMain = {
  preload: function () {
    //loads images into library
    game.load.image("red", "images/main/blocks/red.png");
    game.load.image("blue", "images/main/blocks/blue.png");
    game.load.image("green", "images/main/blocks/green.png");
    game.load.image("yellow", "images/main/blocks/yellow.png");

    //Load the rings spritesheet
    game.load.spritesheet("rings", "images/main/rings.png", 60, 65, 5);
    game.load.spritesheet("balls", "images/main/balls.png", 35, 35, 5);
  },

  //Create function:
  //sets up objects, variables
  //sounds, text
  //good guys, explosions
  create: function () {
    //Use console.log("Ready!") to check that startButton works

    //👉🏼 VARS
    this.speed = 200;
    score = 0;

    //Start the Physics engine (Phaser has several);
    //Physics can only be applied to SPRITES! Not images!!
    game.physics.startSystem(Phaser.Physics.Arcade);

    //👉🏼 BLOCKS
    //Add the blocks to the stage
    var red=game.add.image(0,0, "red");
    var blue=game.add.image(0,100,"blue");
    var green=game.add.image(100,0,"green");
    var yellow=game.add.image(100,100,"yellow");

    //Create listeners for each of the blocks
    red.inputEnabled=true;
    //Give the listener an identifying name (for when it's clicked)
    red.name="red";

    blue.inputEnabled=true;
    blue.name="blue";

    green.inputEnabled=true;
    green.name="green";

    yellow.inputEnabled=true;
    yellow.name="yellow";

    //This create an eventHandler (you defined) to handle what happens
    //When the image is clicked
    red.events.onInputDown.add(this.changeColor, this);
    blue.events.onInputDown.add(this.changeColor, this);
    green.events.onInputDown.add(this.changeColor, this);
    yellow.events.onInputDown.add(this.changeColor, this);


    //Create a group for the blocks
    this.blockGroup=game.add.group();
    //Add blocks to the group
    this.blockGroup.add(red);
    this.blockGroup.add(blue);
    this.blockGroup.add(green);
    this.blockGroup.add(yellow);

    //Center the group
    //Cannot use "anchor" with groups
    this.blockGroup.x=game.world.centerX-
    //Use width of group and divide by 2 to get center
    this.blockGroup.width/2;
    //Set y of the game and -250 for padding
    this.blockGroup.y=game.height-250;

    //👉🏼 RING
    //Add ring to state, centerX for horizontal centering and
    //use the blockGroup's y for vertical subtract 100 to add 100px padding
    this.ring=game.add.image(game.world.centerX, this.blockGroup.y-100, "rings");
    this.ring.anchor.set(0.5, 0.5);

    //👉🏼 BALL
    //add balls to stage
    this.ball=game.add.sprite(0,0, "balls");
    this.ball.anchor.set(0.5, 0.5);
    //Enable physics for the ball
    //If there are multiple items can add in an [Array]
    //Adding physics give the object a 'body'
    game.physics.arcade.enable(this.ball);

    //👉🏼 SCORE TEXT
    this.scoreText = game.add.text(game.world.centerX, 150,"0");
    this.scoreText.fill="#ffffff";
    this.scoreText.fontSize=64;
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreLabel = game.add.text(game.world.centerX, 100,"SCORE");
    this.scoreLabel.fill="#ffffff";
    this.scoreLabel.fontSize=32;
    this.scoreLabel.anchor.set(0.5, 0.5);


    this.setListeners();

    this.resetBall();
  },

  setListeners:function(){
    game.input.onUp.add(this.resetRing, this);
  },

  resetBall: function(){
    //Choose a color at random
    var color=game.rnd.integerInRange(0, 5);
    //Choose an x pos at random
    var xx=game.rnd.integerInRange(0, game.world.width);
    //Choose a y at random
    var yy=game.rnd.integerInRange(0, 100);

    //Set the ball's frame the chosen color
    this.ball.frame= color;
    //Set the ball's x to the random x
    this.ball.x=xx;
    //Set the ball's y to the random y
    this.ball.y=yy;

    //Setting y to 100 will cause object to fall straight down
    // this.ball.body.velocity.setTo(0, 100);

    //Use moveToXY to move the ball to the ring
    //Params --> objectToMove, x, y, and speed (defined earlier);
    //Returns a number --> degrees of rotation
    var rot=game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.speed);
      //Set ball's rotation to above value
      //Makes the ball point the the ring! (Whaaat?! Mind Blown 🤯);
      this.ball.rotation = rot;
  },

  changeColor:function (target){
    console.log(target.name);
    //0=white 1=blue 2=green 3=red 4=yellow
    switch(target.name){
        case "red":
                this.ring.frame=3;
            break;
        case "blue":
                this.ring.frame=1;
            break;
        case "green":
                this.ring.frame=2;
            break;
        case "yellow":
                this.ring.frame=4;
            break;
    }
  },

  resetRing(){
    this.ring.frame=0;
  },

  //constant running loop
  update: function () {
    //Math.abs ignores negative values so,
    // -5 = 5;
    var diffX=Math.abs(this.ring.x - this.ball.x);
    var diffY=Math.abs(this.ring.y - this.ball.y);

    if(diffX<10 && diffY<10){
      this.ball.body.velocity.setTo(0,0);

      if(this.ball.frame==this.ring.frame){
        this.resetBall();
        score++;
        this.scoreText.text=score;
      }
      else{
        //If the frames don't match load the game over screen :)
        game.state.start("StateOver");

      }
    }
  }

};
