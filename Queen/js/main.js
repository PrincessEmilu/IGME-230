"use strict"

//Sets up the game when the window is loaded.
window.onload = function(){
    SetUpGame();
};

//Declare variables
let app;

//Labels
const nutrientsLabel = document.createElement("p");
const minionsLabel = document.createElement("p");

//Buttons
let buttonHarvest = document.createElement("button");
let buttonBuyTick = document.createElement("button");
let buttonBuyHost = document.createElement("button");

//Currency
let nutrients;
let protein;

//Resources
let ticks;
let tickCost;
let hosts;

//Gains, Costs, and caps
let nutrientsPerClick;
let hostCost;
let maxMinions;

function SetUpGame(){
    //Gets a reference to the game container
    app  = document.querySelector("#gameContainer");

    //Set variables
    nutrients = 0;
    ticks = 0;
    hosts = 1;

    //Calculate costs, caps, and gains
    CalculateCostTick();
    CalculateCostHost();
    CalculateMaxMinions();
    CalculateNutrientsPerClick();

    //Set text of the labels
    UpdateLabels();

    //Set up the buttons
    buttonHarvest.innerHTML = "Harvest";
    buttonHarvest.onclick = Harvest;

    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyTick.onclick = BuyTick;

    buttonBuyHost.innerHTML = `Infect Host: ${hostCost} ticks`;
    buttonBuyHost.onclick = BuyHost;

    //Append elements to the game container
    app.appendChild(nutrientsLabel);
    app.appendChild(minionsLabel);

    app.appendChild(buttonHarvest);
    app.appendChild(buttonBuyTick);
    app.appendChild(buttonBuyHost);
}

//Gain nutrients and update labels
function Harvest(){
    nutrients += nutrientsPerClick;
    UpdateLabels();
}

//Buy a tick if the player has capacity and currency for one
function BuyTick(){
    if(nutrients >= tickCost && ticks < maxMinions)
    {
        ticks += 1;
        nutrients -= tickCost;

        //Update labels and calculate new values
        CalculateCostTick();
        CalculateNutrientsPerClick();
        UpdateLabels();
    }
}

//Buys a host if player has the currency
function BuyHost(){
    if(ticks >= hostCost){
        ticks -= hostCost;
        hosts += 1;

        //Calculate new values and update labels
        CalculateCostTick();
        CalculateCostHost();
        CalculateNutrientsPerClick();
        CalculateMaxMinions();
        UpdateLabels();
    }
}

//Updates all of the labels. Called whenever something happens that requries recalculations.
function UpdateLabels(){
    nutrientsLabel.innerHTML = `Nutrients: ${nutrients}`;
    minionsLabel.innerHTML = `Minions: ${ticks}/${maxMinions}`;
    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
}

//Calculates max minions
function CalculateMaxMinions(){
    maxMinions = hosts * 50;
}

//Calculates what player earns from harvest button
function CalculateNutrientsPerClick(){
    nutrientsPerClick = 1 + ticks;
}

//Calculates the cost of a tick.
function CalculateCostTick(){
    tickCost = Math.floor((10 * Math.pow(1.2, ticks)));
    console.log(tickCost);
}

//Calculates the cost of a new host
function CalculateCostHost(){
    hostCost = Math.floor((20 * Math.pow(1.7, hosts)));
}