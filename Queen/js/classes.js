"use strict"
class Tick{
    constructor(){
        this.newTick = document.createElement("img");
        this.newTick.minionType = "tick";
        this.newTick.src = "media/bug1.png";
        this.newTick.setAttribute("class","minion");
        this.newTick.style.top = Math.random() * 140 + "px";
        gameWorld.appendChild(this.newTick);
    }
    remove(){
        gameWorld.removeChild(this.newTick);
    }
}

class Leech{
    constructor(){
        this.newLeech = document.createElement("img");
        this.newLeech.minionType = "tick";
        this.newLeech.src = "media/leech1.png";
        this.newLeech.setAttribute("class","minion");
        this.newLeech.style.top = Math.random() * 140 + "px";
        gameWorld.appendChild(this.newLeech);
    }
    remove(){
        gameWorld.removeChild(this.newLeech);
    }
}