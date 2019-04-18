"use strict"

//TODO: Makes these guys move around/replaces with my own graphics
class Tick extends PIXI.Sprite{
    constructor(x=0,y=0){
        super(PIXI.loader.resources["images/bug1.png"].texture);
        this.anchor.set(.5,.5); //Position, scaling, roating, etc. at center
        this.scale.set(0.25);
        this.x = x;
        this.y = y;
    }
}

//Button class
class Button extends PIXI.Sprite{
    constructor(text="Undefied",x=0,y=0){
        super(PIXI.loader.resources["images/buttonGlossyLong.png"].texture);
        this.anchor.set(.5,.5);
        this.scale.set(1.0);
        this.x = x;
        this.y = y;
    }
}