"use strict"

console.log("Boop!");

//Declare variables
let nutrients,nutrientsPerClick,protein,ticks,hosts;

//Grab references to HTML elements
const gameWindow = document.querySelector("#gameWindow")
const buttonHarvest = document.querySelector("#harvest");
const displayStats = document.querySelector("#stats");


//Init variables
nutrients = 0;
nutrientsPerClick = 1;

//Add events to buttons
buttonHarvest.onclick = e=>{
    nutrients += nutrientsPerClick
    UpdateStatsDisplay();
};

//Update HUD
function UpdateStatsDisplay(){
    displayStats.innerHTML = `Nutrients: ${nutrients}`;
}
