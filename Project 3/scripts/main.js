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