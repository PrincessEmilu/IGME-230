"use strict"

//Sets up the game when the window is loaded.
window.onload = function(){
    setUpGame();
};
//TODO: Implement an ES6 class of my own creation

//Declare variables//
//Gets the game containers
let app;
let gameWorld;
let statsDisplay;
let harvestContainer;
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
let buttonUpgradeLeech = document.createElement("button");

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
let levelLeech;
let upgradeLeechCost;

//Holds the graphical representations of minions
let tickArray = [];
let leechArray = [];

//LocalStorage keys
const prefix = "eh8582";
const nutrientsKey = prefix + "nutrients";
const proteinKey = prefix + "protein";
const ticksKey = prefix + "ticks";
const leechesKey = prefix + "leeches";
const hostsKey = prefix + "hosts";
const levelHarvestKey = prefix + "levelHarvest";
const levelLeechKey = prefix + "levelLeech";

//Audio Assets
let music = new Howl({
    src: ['media/giantWyrm.mp3'],
    loop: true
});

let hatch = new Howl({
    src: ['media/hatch1.wav']
})

let squelch = new Howl({
    src: ['media/squelch1.wav']
})

let crunch = new Howl({
    src: ['media/crunch1.wav']
})

let scream = new Howl({
    src: ['media/scream1.wav']
})

function setUpGame(){

    //Start music playing
    music.play();

    //Gets a reference to the game container(s)
    app  = document.querySelector("#gameContainer");
    gameWorld = document.querySelector("#gameWorld");
    statsDisplay = document.querySelector("#statsDisplay");
    harvestContainer = document.querySelector("#harvestContainer");
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
    levelLeech = 1;

    //Set up the buttons
    buttonHarvest.innerHTML = "Harvest";
    buttonHarvest.setAttribute("id","buttonHarvest");
    buttonHarvest.onclick = harvest;
    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyTick.onclick = buyTick;
    buttonBuyLeech.innerHTML = `Spawn Leech: ${leechCost}`;
    buttonBuyLeech.onclick = buyLeech;
    buttonBuyHost.innerHTML = `Infect Host: ${hostCost} minions`;
    buttonBuyHost.onclick = buyHost;
    buttonConsumeHost.innerHTML = `Consume Host: +${proteinPerHost} protein`;
    buttonConsumeHost.onclick = consumeHost;
    buttonUpgradeHarvest.innerHTML = `Upgrade Harvest: ${upgradeHarvestCost} protein`;
    buttonUpgradeHarvest.onclick = levelUpHarvest;
    buttonUpgradeLeech.innerHTML = `Upgrade Leech: ${upgradeLeechCost} protein`;
    buttonUpgradeLeech.onclick = levelUpLeech;
    buttonUnits.innerHTML = "Units";
    buttonUnits.onclick = changeMenu;
    buttonHosts.innerHTML = "Hosts";
    buttonHosts.onclick = changeMenu;
    buttonUpgrades.innerHTML = "Upgrades";
    buttonUpgrades.onclick = changeMenu;

    //Append elements to the statsDisplay container
    statsDisplay.appendChild(nutrientsLabel);
    statsDisplay.appendChild(minionsLabel);
    statsDisplay.appendChild(hostsLabel);
    statsDisplay.appendChild(proteinLabel);
    harvestContainer.appendChild(buttonHarvest);
    unitsButtons.appendChild(buttonBuyTick);
    hostsButtons.appendChild(buttonBuyHost);
    hostsButtons.appendChild(buttonConsumeHost);
    upgradesButtons.appendChild(buttonUpgradeHarvest);
    upgradesButtons.appendChild(buttonUpgradeLeech);
    menuButtons.appendChild(buttonUnits);

    //Tries to load save data
    loadData();
    performCalculations();
    updateLabels();

    //Setup gaining nutrients per second
    setInterval(gainNutrientsPerSecond, 100);
}

//Gain nutrients and update labels
function harvest(){
    nutrients += nutrientsPerClick;
    updateLabels();
}

//Gain 1/10th of nutrients per second every 100 milliseconds
function gainNutrientsPerSecond(){
    nutrients += nutrientsPerSecond/10;
    updateLabels();
}

//Buy a tick if the player has capacity and currency for one
function buyTick(){
    if(nutrients >= tickCost && minions < maxMinions)
    {
        hatch.play();

        ticks += 1;
        nutrients -= tickCost;

        //Update labels and calculate new values
        performCalculations();
        updateLabels();

        tickArray.push(new Tick());


    }
}

//Buys a host if player has the currency
function buyHost(){
    if(minions >= hostCost){

        //Simply pay in ticks; nothing further required if there's enough.
        if(ticks >= hostCost){
            ticks -= hostCost;

            //Removes ticks from the display
            removeTicks(hostCost);
        }
        //Otherwise, ticks and leeches will need to be removed- or maybe even just leeches.
        else{
            let remainingCost = hostCost;
            while(ticks < remainingCost && remainingCost > 0){
                leeches -= 1;
                remainingCost -= leechWeight;
                removeLeeches(1);
            }
            //Either cost is paid off, or the player now has enough ticks to foot the bill
            if(remainingCost > 0)
            {
                ticks -= remainingCost;
                removeTicks(remainingCost);
            }
        }

        //Finally, give the player the host and update displays/values
        scream.play();
        hosts += 1;

        //Calculate new values and update labels
        performCalculations();
        updateLabels();
    }
}

//Buys a leech if affordable
function buyLeech(){
    if(nutrients > leechCost && minions + leechWeight <= maxMinions)
    {
        squelch.play();

        nutrients -= leechCost;
        leeches += 1;

        performCalculations();
        updateLabels();

        //Create the graphical representation of the little guy
        leechArray.push(new Leech());
    }
}

//Player will consume a host if they have more than one.
//Not only do they gain protein, but their minion capacity decreases.
//Some minions may have to be removed.
function consumeHost(){
    if(hosts > 1){
        crunch.play();
        hosts -= 1;
        protein += proteinPerHost;
        performCalculations();

        //Adjusts ticks if necesary
        //TODO: Logic for removing certain units in a priority
        performCalculations();
        if(ticks > maxMinions){
            ticks = maxMinions;
            performCalculations();
        }

        //Finally update the labels
        updateLabels();
    }
}

//Updates all of the labels. Called whenever something happens that requries recalculations.
function updateLabels(){
    nutrientsLabel.innerHTML = `Nutrients: ${Math.floor(nutrients)}`;
    minionsLabel.innerHTML = `Minions: ${minions}/${maxMinions}`;
    hostsLabel.innerHTML = `Hosts: ${hosts}`;
    proteinLabel.innerHTML = `Protein: ${protein}`;

    buttonBuyTick.innerHTML = `Spawn Tick: ${tickCost} nutrients`;
    buttonBuyLeech.innerHTML = `Spawn Leech: ${leechCost}`;
    buttonBuyHost.innerHTML = `Infect Host: ${hostCost} minions`;
    buttonUpgradeHarvest.innerHTML = `Upgrade Harvest: ${upgradeHarvestCost} protein`;
    buttonUpgradeLeech.innerHTML = `Upgrade Leech: ${upgradeLeechCost} protein`;

    //This section here will display new info as the player advances
    //Appends leech button
    if(minions == 10 && menuButtons.childNodes.length == 1){
        unitsButtons.appendChild(buttonBuyLeech);
    }
    //Shows hosts and protein info, appends hosts button
    if(minions >= 15 && menuButtons.childNodes.length == 1)
    {
        menuButtons.appendChild(buttonHosts);
    }
    //Add upgrade menu when host first gained
    if(hosts > 1 && menuButtons.childNodes.length == 2){
        menuButtons.appendChild(buttonUpgrades);
    }

    //Call save data
    saveData();
}

//Level up harvest efficiency
function levelUpHarvest(){
    if(protein >= upgradeHarvestCost)
    {
        protein -= upgradeHarvestCost;
        levelHarvest += 1;

        performCalculations();
        updateLabels();
    }
}

//Level up leech efficiency
function levelUpLeech(){
    if(protein >= upgradeLeechCost)
    {
        protein -= upgradeLeechCost;
        levelLeech += 1;

        performCalculations();
        updateLabels();
    }
}

//Change the contextual menu
function changeMenu(e){
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

//Removes ticks from list/page
function removeTicks(numberToRemove=1){
    for(let i = 0; i < numberToRemove; i++)
    {
        tickArray.pop().remove();
    }
}

//Removes leeches from list/page
function removeLeeches(numberToRemove=1){
    for(let i = 0; i < numberToRemove; i++)
    {
        gameWorld.removeChild(leechArray.pop());
    }
}

//Saves game data to local storage
function saveData(){
    localStorage.setItem(ticksKey, ticks);
    localStorage.setItem(leechesKey,leeches);
    localStorage.setItem(hostsKey,hosts);
    localStorage.setItem(levelHarvestKey,levelHarvest);
    localStorage.setItem(levelLeechKey,levelLeech);
    localStorage.setItem(nutrientsKey,nutrients);
    localStorage.setItem(proteinKey,protein);
}

//Loads data from localStorage
function loadData(){
    const storedTicks = localStorage.getItem(ticksKey);
    const storedLeeches = localStorage.getItem(leechesKey);
    const storedHosts = localStorage.getItem(hostsKey);
    const storedLevelHarvest = localStorage.getItem(levelHarvestKey);
    const storedLevelLeech = localStorage.getItem(levelLeechKey);
    const storedNutrients = localStorage.getItem(nutrientsKey);
    const storedProtein = localStorage.getItem(proteinKey);

    //If data is found, set the variables.
    if(storedNutrients){
        ticks = Number(storedTicks);
        leeches = Number(storedLeeches);
        hosts = Number(storedHosts);
        levelHarvest = Number(storedLevelHarvest);
        levelLeech = Number(storedLevelLeech);
        nutrients = Number(storedNutrients);
        protein = Number(storedProtein);

        //Appends normally hidden buttons if appropriate; different logic than in-game
        if(leeches > 0 || protein > 0 || hosts > 1){
            unitsButtons.appendChild(buttonBuyLeech);
            menuButtons.appendChild(buttonHosts);
            menuButtons.appendChild(buttonUpgrades);
        }

        //Add ticks to tick array
        for(let i = 0; i < ticks; i++){
            //Create the graphical representation of the little guy
            tickArray.push(new Tick());
        }

        //Add leeches to leech array
        for(let i = 0; i < leeches; i ++){
    
            //Create the graphical representation of the little guy
            leechArray.push(new Leech());
        }
    }
}