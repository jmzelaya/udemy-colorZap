var StateMain = {
  preload: function () {
    //loads images into library
    game.load.image("red", "images/main/blocks/red.png");
    game.load.image("blue", "images/main/blocks/blue.png");
    game.load.image("green", "images/main/blocks/green.png");
    game.load.image("yellow", "images/main/blocks/yellow.png");
  },

  //Create function:
  //sets up objects, variables
  //sounds, text
  //good guys, explosions
  create: function () {
    //Use console.log("Ready!") to check that startButton works

    //Add the blocks to the stage
    var red=game.add.image(0,0, "red");
    var blue=game.add.image(0,100,"blue");
    var green=game.add.image(100,0,"green");
    var yellow=game.add.image(100,100,"yellow");

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


  },

  update: function () {
    //constant running loop
  }

};
