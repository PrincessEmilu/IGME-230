"use strict"

function PerformCalculations() {

    //Minion calculations
    //Calculates max minions
    maxMinions = hosts * 50;
    
    //Calculates current minions
    minions = (ticks * tickWeight) + (leeches * leechWeight);


    //Calculates gains
    //Calculates what player earns from harvest button
    nutrientsPerClick = (1 + ticks) * levelHarvest;

    //Calculates nutrients per second
    nutrientsPerSecond = 10 * levelLeech * leeches;
    
    //Cost Calculations
    //Calculates the cost of a tick.
    tickCost = Math.floor((10 * Math.pow(1.2, ticks)));

    //Calculate cost of leech
    leechCost = Math.floor((500 * Math.pow(1.7, leeches)));

    //Calculates the cost of a new host
    hostCost = Math.floor((20 * Math.pow(1.4, hosts - 1)));

    //Calculates cost of upgrading harvest gains
    upgradeHarvestCost = Math.floor((5 * Math.pow(1.4, levelHarvest - 1)));

    //Calculates cost of upgrading leech gains
    upgradeLeechCost = Math.floor((10 * Math.pow(1.7, levelLeech - 1)));
}