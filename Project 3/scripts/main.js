"use strict"

console.log("Boop!");

//Declare variables
let nutrients,
    nutrientsPerClick,
    protein,
    ticks,
    hosts,
    tickCost,
    hostCost,
    maxMinions;

//For display purposes
let arrayTicks = [];

let menuState;

//Labels that get updated
let labelNutrients;
let labelMinions;

//Create and append the game window.
const gameWidth = 600;
const gameHeight = 600;
const app = new PIXI.Application(600, 600);
document.querySelector("#gameWindow").appendChild(app.view);

//aLIASES
const stage = app.stage;

//Game states
let titleScene, gameScene;

//Preload images
PIXI.loader.
add(["images/skullLogo.png", "images/bug1.png", "images/buttonGlossyLong.png"]).
on("progress", e => {
    console.log(`progress=${e.progress}`)
}).
load(setup);

function setup() {
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
}

function createLabelsAndButtons() {
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
    startLabel1.x = gameWidth / 3;
    startLabel1.y = gameHeight / 4;
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

    labelMinions = new PIXI.Text("Minions: 0/100");
    labelMinions.style = styleStats;
    labelMinions.x = 0;
    labelMinions.y = 20;
    gameScene.addChild(labelMinions);

    //Create the start button
    const startButton = PIXI.Sprite.fromImage('images/skullLogo.png');
    startButton.anchor.set(0.5);
    startButton.style = buttonStyle;
    startButton.x = gameWidth / 2;
    startButton.y = gameHeight - 100;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on('pointerover', e => e.currentTarget.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    titleScene.addChild(startButton);

    //Create the harvest button
    const harvestButton = PIXI.Sprite.fromImage('images/buttonGlossyLong.png');
    harvestButton.anchor.set(0.5);
    harvestButton.style = buttonStyle;
    harvestButton.x = gameWidth / 2;
    harvestButton.y = gameHeight - 100;
    harvestButton.interactive = true;
    harvestButton.buttonMode = true;
    harvestButton.on("pointerup", harvestNutrients);
    harvestButton.on('pointerover', e => e.currentTarget.alpha = 0.7);
    harvestButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(harvestButton);

    //Create the buy tick button
    const buyTickButton = PIXI.Sprite.fromImage('images/buttonGlossyLong.png');
    buyTickButton.anchor.set(0.5);
    buyTickButton.style = buttonStyle;
    buyTickButton.x = gameWidth / 2;
    buyTickButton.y = gameHeight - 200;
    buyTickButton.interactive = true;
    buyTickButton.buttonMode = true;
    buyTickButton.on("pointerup", buyTick);
    buyTickButton.on('pointerover', e => e.currentTarget.alpha = 0.7);
    buyTickButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(buyTickButton);
}

function startGame() {

    //Change game state
    console.log("Startgame!");
    titleScene.visible = false;
    gameScene.visible = true;

    //Setup variables
    nutrients = 0;
    nutrientsPerClick = 1;
    ticks = 0;
    hosts = 1;
    tickCost = 10;
    //Set value of max minions
    calculateMaxMinions();

    menuState = 0;

    //Create the objects?
}

//The most basic action the player can take is harvesting nutrients from a host.
function harvestNutrients() {
    nutrients += nutrientsPerClick;
    updateStats();
}

//The player can buy ticks to increase their economic gains
function buyTick() {
    if (nutrients >= tickCost && ticks < maxMinions) {
        nutrients -= tickCost;
        ticks += 1;

        calculateCostTick();
        updateStats();

        //TODO: Make this a variables
        nutrientsPerClick += 1;

        let tick = new Tick(getRandom(100, gameWidth), getRandom(0, 200));
        arrayTicks.push(tick);
        gameScene.addChild(tick);
    }
}

function updateStats(){
    labelNutrients.text = `Nutrients: ${nutrients}`;
    labelMinions.text = `Minions: ${ticks}/${maxMinions}`;
}
function calculateMaxMinions(){
    maxMinions = hosts * 100;
}
function calculateCostTick() {
    tickCost = Math.floor((10 * Math.pow(1.2, ticks)));
    console.log(tickCost);
}