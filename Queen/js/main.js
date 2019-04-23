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
const hostsLabel = document.createElement("p");
const proteinLabel = document.createElement("p");

//Buttons
let buttonHarvest = document.createElement("button");
let buttonBuyTick = document.createElement("button");
let buttonBuyHost = document.createElement("button");
let buttonConsumeHost = document.createElement("button");
let buttonUpgradeHarvest = document.createElement("button");

//Currency
let nutrients;
let protein;

//Resources
let ticks;
let tickCost;
let hosts;

//Gains, Costs, and caps
let nutrientsPerClick;
let proteinPerHost;
let hostCost;
let maxMinions;
let levelHarvest;
let upgradeHarvestCost;

function SetUpGame(){
    //Gets a reference to the game container
    app  = document.querySelector("#gameContainer");

    //Set variables
    nutrients = 0;
    protein = 0;
    ticks = 0;
    hosts = 1;
    proteinPerHost = 10;

    levelHarvest = 1;

    //Calculate costs, caps, and gains
    CalculateCostTick();
    CalculateCostHost();
    CalculateMaxMinions();
    CalculateCostHarvest();
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

    buttonConsumeHost.innerHTML = `Consume Host: +${proteinPerHost} protein`;
    buttonConsumeHost.onclick = ConsumeHost;

    buttonUpgradeHarvest.innerHTML = `Upgrade Harvest: ${upgradeHarvestCost} protein`;
    buttonUpgradeHarvest.onclick = LevelUpHarvest;

    //Append elements to the game container
    app.appendChild(nutrientsLabel);
    app.appendChild(minionsLabel);
    app.appendChild(hostsLabel);
    app.appendChild(proteinLabel);

    //Hides certain elements until certain triggers have occured.
    hostsLabel.style.display = "none";
    proteinLabel.style.display = "none";

    app.appendChild(buttonHarvest);
    app.appendChild(buttonBuyTick);
    app.appendChild(buttonBuyHost);
    app.appendChild(buttonConsumeHost);
    app.appendChild(buttonUpgradeHarvest);
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

//Player will consume a host if they have more than one.
//Not only do they gain protein, but their minion capacity decreases.
//Some minions may have to be removed.
function ConsumeHost(){
    if(hosts > 1){
        hosts -= 1;
        protein += proteinPerHost;
        CalculateCostHost();

        //Adjusts ticks if necesary
        CalculateMaxMinions();
        if(ticks > maxMinions){
            ticks = maxMinions;
            CalculateNutrientsPerClick();
        }

        //Finally update the labels
        UpdateLabels();
    }
}

//Updates all of the labels. Called whenever something happens that requries recalculations.
function UpdateLabels(){
    nutrientsLabel.innerHTML = `Nutrients: ${nutrients}`;
    minionsLabel.innerHTML = `Minions: ${ticks}/${maxMinions}`;
    hostsLabel.innerHTML = `Hosts: ${hosts}`;
    proteinLabel.innerHTML = `Protein: ${protein}`;

    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyHost.innerHTML = `Infect Host: ${hostCost} ticks`;
    buttonUpgradeHarvest.innerHTML = `Upgrade Harvest: ${upgradeHarvestCost} protein`;

    //This section here will display new info as the player advances
    if(ticks >= 12 && hostsLabel.style.display == "none")
    {
        hostsLabel.style.display = "block";
        proteinLabel.style.display = "block";
    }
}

//Level up harvest efficiency
function LevelUpHarvest(){
    if(protein >= upgradeHarvestCost)
    {
        protein -= upgradeHarvestCost;
        levelHarvest += 1;

        CalculateNutrientsPerClick();
        CalculateCostHarvest();
        UpdateLabels();
    }
}
//Calculates max minions
function CalculateMaxMinions(){
    maxMinions = hosts * 50;
}

//Calculates what player earns from harvest button
function CalculateNutrientsPerClick(){
    nutrientsPerClick = (1 + ticks) * levelHarvest;
}

//Calculates the cost of a tick.
function CalculateCostTick(){
    tickCost = Math.floor((10 * Math.pow(1.2, ticks)));
    console.log(tickCost);
}

//Calculates the cost of a new host
function CalculateCostHost(){
    hostCost = Math.floor((20 * Math.pow(1.4, hosts - 1)));
}

//Calculate cost of harvest upgrades
function CalculateCostHarvest(){
    upgradeHarvestCost = Math.floor((5 * Math.pow(1.4, levelHarvest - 1)));
}