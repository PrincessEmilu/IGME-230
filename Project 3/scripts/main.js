"use strict"

console.log("Boop!");

//Declare variables
let nutrients,
    nutrientsPerClick,
    protein,
    ticks,
    hosts,
    tickCost,
    hostCost;

//For display purposes
let arrayTicks = [];

//Labels that get updated
let labelNutrients;

//Create and append the game window.
const gameWidth = 600;
const gameHeight = 600;
const app = new PIXI.Application(600,600);
document.querySelector("#gameWindow").appendChild(app.view);

//aLIASES
const stage = app.stage;

//Game states
let titleScene,gameScene;


//Setup game scenes
titleScene = new PIXI.Container();
stage.addChild(titleScene);

gameScene = new PIXI.Container();
gameScene.visible = false;
stage.addChild(gameScene);

//Setup game scene
gameScene = new PIXI.Container();
gameScene.visible = false;
stage.addChild(gameScene);

//Sets up the game
createLabelsAndButtons();

function createLabelsAndButtons(){
        //TODO: Define different button styles and incorporate them
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: "Arial"
    });

    //Set up startScene
    //make the top start label
    let startLabel1 = new PIXI.Text("Queen");
    startLabel1.style = new PIXI.TextStyle({
        fill: 0xFF00FF,
        fontSize: 48,
        fontFamily: 'Arial',
        stroke: 0xFFFFFF,
        strokeThickness: 1
    });
    startLabel1.x = gameWidth /3;
    startLabel1.y = gameHeight/4;
    titleScene.addChild(startLabel1);

    //Set up game scene
    //Text style for curerncy/economy info
    let styleStats = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 24,
        fontFamily: 'Arial',
        strokg: 0xFFFFFF,
        strokeThickness: 1
    });

    //Sets up the labels for stat display
    //TODO: Add all of the stats
    labelNutrients = new PIXI.Text("Nutrients: 0");
    labelNutrients.style = styleStats;
    labelNutrients.x = 0;
    labelNutrients.y = 0;
    gameScene.addChild(labelNutrients);

    //Create the start button
    const startButton = PIXI.Sprite.fromImage('images/skullLogo.png');
    startButton.anchor.set(0.5);
    startButton.style = buttonStyle;
    startButton.x = gameWidth / 2;
    startButton.y = gameHeight - 100;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup",startGame);
    startButton.on('pointerover', e=>e.currentTarget.alpha = 0.7);
    startButton.on('pointerout', e=>e.currentTarget.alpha = 1.0);
    titleScene.addChild(startButton);

    //Create the harvest button
    const harvestButton = PIXI.Sprite.fromImage('images/skullLogo.png');
    harvestButton.anchor.set(0.5);
    harvestButton.style = buttonStyle;
    harvestButton.x = gameWidth / 2;
    harvestButton.y = gameHeight - 100;
    harvestButton.interactive = true;
    harvestButton.buttonMode = true;
    harvestButton.on("pointerup",harvestNutrients);
    harvestButton.on('pointerover', e=>e.currentTarget.alpha = 0.7);
    harvestButton.on('pointerout', e=>e.currentTarget.alpha = 1.0);
    gameScene.addChild(harvestButton);
}

function startGame(){

    //Change game state
    console.log("Startgame!");
    titleScene.visible = false;
    gameScene.visible = true;

    //Setup variables
    nutrients = 0;
    nutrientsPerClick = 1;

    //Create the objects?
}

//The most basic action the player can take is harvesting nutrients from a host.
function harvestNutrients(){
    nutrients += nutrientsPerClick;

    //TODO: Consider adding text updates to a method?
    //Need to update text
    labelNutrients.text = `Nutrients: ${nutrients}`;
}
