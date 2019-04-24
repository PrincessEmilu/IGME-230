"use strict"

//Sets up the game when the window is loaded.
window.onload = function(){
    SetUpGame();
};

//Declare variables//

//Gets the game containers
let app;
let gameWorld;
let statsDisplay;
let menuButtons;

let unitsButtons;
let upgradesButtons;
let hostsButtons;

//Menu/state variables
let currentMenu;

//Labels
const nutrientsLabel = document.createElement("p");
const minionsLabel = document.createElement("p");
const hostsLabel = document.createElement("p");
const proteinLabel = document.createElement("p");

//Buttons//
//Contextual
let buttonHarvest = document.createElement("button");
let buttonBuyTick = document.createElement("button");
let buttonBuyLeech = document.createElement("button");
let buttonBuyHost = document.createElement("button");
let buttonConsumeHost = document.createElement("button");
let buttonUpgradeHarvest = document.createElement("button");

//Menu buttons
let buttonUnits = document.createElement("button");
let buttonUpgrades = document.createElement("button");
let buttonHosts = document.createElement("button");

//Currency
let nutrients;
let protein;

//Resources
let ticks;
let tickCost;
let tickWeight;
let leeches;
let leechCost;
let leechWeight;
let hosts;

//Gains, Costs, and caps
let nutrientsPerClick;
let nutrientsPerSecond;
let proteinPerHost;
let hostCost;
let minions;
let maxMinions;

let levelHarvest;
let upgradeHarvestCost;

function SetUpGame(){
    //Gets a reference to the game container(s)
    app  = document.querySelector("#gameContainer");
    gameWorld = document.querySelector("#gameWorld");
    statsDisplay = document.querySelector("#statsDisplay");
    menuButtons = document.querySelector("#menuCategories");
    unitsButtons = document.querySelector("#units");
    upgradesButtons = document.querySelector("#upgrades");
    hostsButtons = document.querySelector("#hosts");

    currentMenu = unitsButtons;

    //Hides display of several containers
    hostsButtons.style.display = "none";
    upgradesButtons.style.display = "none";

    //Set variables
    nutrients = 0;
    protein = 0;
    ticks = 0;
    tickWeight = 1;
    leeches = 0;
    leechWeight = 3;
    minions = 0;
    hosts = 1;
    proteinPerHost = 10;

    levelHarvest = 1;

    //Calculate costs, caps, and gains etc.
    PerformCalculations();

    //Set text of the labels
    UpdateLabels();

    //Set up the buttons
    buttonHarvest.innerHTML = "Harvest";
    buttonHarvest.onclick = Harvest;

    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyTick.onclick = BuyTick;

    buttonBuyLeech.innerHTML = `Spawn Leech: ${leechCost}`;
    buttonBuyLeech.onclick = BuyLeech;

    buttonBuyHost.innerHTML = `Infect Host: ${hostCost} ticks`;
    buttonBuyHost.onclick = BuyHost;

    buttonConsumeHost.innerHTML = `Consume Host: +${proteinPerHost} protein`;
    buttonConsumeHost.onclick = ConsumeHost;

    buttonUpgradeHarvest.innerHTML = `Upgrade Harvest: ${upgradeHarvestCost} protein`;
    buttonUpgradeHarvest.onclick = LevelUpHarvest;

    buttonUnits.innerHTML = "Units";
    buttonUnits.onclick = ChangeMenu;

    buttonHosts.innerHTML = "Hosts";
    buttonHosts.onclick = ChangeMenu;

    buttonUpgrades.innerHTML = "Upgrades";
    buttonUpgrades.onclick = ChangeMenu;

    //Append elements to the statsDisplay container
    statsDisplay.appendChild(nutrientsLabel);
    statsDisplay.appendChild(minionsLabel);
    statsDisplay.appendChild(hostsLabel);
    statsDisplay.appendChild(proteinLabel);

    //Hides certain elements until certain triggers have occured.
    hostsLabel.style.display = "none";
    proteinLabel.style.display = "none";

    //TODO: Figure out where the heck the harvest button goes!
    //app.appendChild(buttonHarvest);

    unitsButtons.appendChild(buttonBuyTick);
    unitsButtons.appendChild(buttonBuyLeech);

    hostsButtons.appendChild(buttonBuyHost);
    hostsButtons.appendChild(buttonConsumeHost);

    upgradesButtons.appendChild(buttonUpgradeHarvest);

    menuButtons.appendChild(buttonUnits);
    menuButtons.appendChild(buttonUpgrades);
    menuButtons.appendChild(buttonHosts);

    //Setup gaining nutrients per second
    setInterval(GainNutrientsPerSecond, 100);
}

//Gain nutrients and update labels
function Harvest(){
    nutrients += nutrientsPerClick;
    UpdateLabels();
}

//Gain 1/10th of nutrients per second every 100 milliseconds
function GainNutrientsPerSecond(){
    nutrients += nutrientsPerSecond/10;
    UpdateLabels();
}

//Buy a tick if the player has capacity and currency for one
function BuyTick(){
    if(nutrients >= tickCost && minions < maxMinions)
    {
        ticks += 1;
        nutrients -= tickCost;

        //Update labels and calculate new values
        PerformCalculations();
        UpdateLabels();

        //Create the graphical representation of the little guy
        let newTick = document.createElement("img");
        newTick.src = "media/bug1.png";
        newTick.setAttribute("class","minion");
        newTick.style.left ="0px";
        newTick.style.top ="0px";
        newTick.style.maxHeight = "60px";
        newTick.style.maxWidth = "60px";

        gameWorld.appendChild(newTick);


    }
}

//Buys a host if player has the currency
function BuyHost(){
    if(ticks >= hostCost){
        ticks -= hostCost;
        hosts += 1;

        //Calculate new values and update labels
        PerformCalculations();
        UpdateLabels();
    }
}

//Buys a leech if affordable
function BuyLeech(){
    //TODO: Change 3 to a variable at some point
    if(nutrients > leechCost && minions + leechWeight < maxMinions)
    {
        nutrients -= leechCost;
        leeches += 1;

        PerformCalculations();
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
        PerformCalculations();

        //Adjusts ticks if necesary
        //TODO: Logic for removing certain units in a priority
        PerformCalculations();
        if(ticks > maxMinions){
            ticks = maxMinions;
            PerformCalculations();
        }

        //Finally update the labels
        UpdateLabels();
    }
}

//Updates all of the labels. Called whenever something happens that requries recalculations.
function UpdateLabels(){
    nutrientsLabel.innerHTML = `Nutrients: ${Math.floor(nutrients)}`;
    minionsLabel.innerHTML = `Minions: ${minions}/${maxMinions}`;
    hostsLabel.innerHTML = `Hosts: ${hosts}`;
    proteinLabel.innerHTML = `Protein: ${protein}`;

    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyLeech.innerHTML = `Spawn Leech: ${leechCost}`;
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

        PerformCalculations();
        UpdateLabels();
    }
}

//Change the contextual menu
function ChangeMenu(e){
    let searchString = e.target.innerHTML.toLowerCase();
    searchString += "Buttons";
    searchString = eval(searchString)

    if(currentMenu != searchString){
        //Hide the current menu
        currentMenu.style.display = "none";

        //Show the clicked-on menu
        currentMenu = searchString;
        currentMenu.style.display = "flex";
    }
    else{
        if(currentMenu.style.display == "none"){
            currentMenu.style.display = "flex";
        }
        else{
            currentMenu.style.display = "none";
        }
    }
}