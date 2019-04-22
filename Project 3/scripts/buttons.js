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

    //Create the harvest button and a label for it
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

    const labelHarvest = new PIXI.Text("Harvest");
    labelHarvest.style = styleStats;
    labelHarvest.x = harvestButton.x;
    labelHarvest.y = harvestButton.y;
    gameScene.addChild(labelHarvest);

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

    const labelbuyTick = new PIXI.Text("Buy Tick");
    labelbuyTick.style = styleStats;
    labelbuyTick.x = buyTickButton.x;
    labelbuyTick.y = buyTickButton.y;
    gameScene.addChild(labelbuyTick);
}