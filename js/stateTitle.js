var StateTitle = {
  preload: function (){
    //Load the game logo
    game.load.image("logo", "images/title/gameLogo.png");
    //Load a spritesheet --> params (4, optional 5)
    //refName, imgPath, imgWidth, imgHeight, optional: # of sprites
    game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
    //Lock screen orientation for mobile
    //Has 2 parameters (lanscape, portrait)
    //Takes a boolean for each
    if (screen.width<900){
      game.scale.forceOrientation(false, true);
    }
  },

  create:function (){
    //Add the logo and center it
    this.logo = game.add.sprite(game.world.centerX,180, "logo");
    //Change the "anchor" point of the logo
    //to be the center of the logo (Between 0 and 1);
    this.logo.anchor.set(0.5, 0.5);

    //START BUTTON
    //Params: x,y, imageKey (spritesheet refName), clickFunction, this(the scope),
    //over_frame(frame#), normal_frame(frame#), down_frame(frame#)
    this.btnStart = game.add.button(game.world.centerX , game.world.height-150,
      "buttons", this.startGame, this, 7, 6, 7);
    this.btnStart.anchor.set(0.5, 0.5);

    //Call the setListeners function
    this.setListeners();
  },

  startGame:function(){
    //if we don't pass "this", then the "this" keyword
    //will refer to the button and NOT the state
    //Check to see if the button works with
    // console.log("Start Game!");
    game.state.start("StateMain");
  },

  //Define ALL listeners in a separate function
  //Allow for better organization
  setListeners: function(){
    if (screen.width<900){
      game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
      game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    }
  },

  wrongWay: function(){
    //Check to see if it detects the enterIncorrectOrientation
    // console.log("wrongWay");
    //When in wrongWay make the div #wrongWay display BLOCK
    document.getElementById("wrongWay").style.display="block";
  },

  rightWay:function(){
    //Check to see if it detects the leaveIncorrectOrientation
    // console.log("rightWay");
    //When in the rightWay make the div #wrongWay display NONE
    document.getElementById("wrongWay").style.display="none";
  },

  update: function (){

  }

};
