var StateTitle = {
  preload: function (){
    //Game logo
    game.load.image("logo", "images/title/gameLogo.png");
    //Lock screen orientation for mobile
    //Has 2 parameters (lanscape, portrait)
    //Takes a boolean for each
    game.scale.forceOrientation(false, true);
  },

  create:function (){
    //Add the logo and center it
    this.logo = game.add.sprite(game.world.centerX,180, "logo");
    //Change the "anchor" point of the logo
    //to be the center of the logo (Between 0 and 1);
    this.logo.anchor.set(0.5, 0.5);
    //Call the setListeners function
    this.setListeners();
  },

  //Define ALL listeners in a separate function
  //Allow for better organization
  setListeners: function(){
    game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
    game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
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
