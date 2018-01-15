var StateTitle = {
  preload: function (){
    game.load.image("logo", "images/title/gameLogo.png");
  },

  create:function (){
    //Add the logo and center it
    this.logo = game.add.sprite(game.world.centerX,180, "logo");
    //Change the "anchor" point of the logo
    //to be the center of the logo (Between 0 and 1);
    this.logo.anchor.set(0.5, 0.5);
  },

  update: function (){

  }

};
