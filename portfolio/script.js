"use strict"

//Declare varaibles
let galleryItems;

//When the window loads, set up event handling
window.onload = (e) =>{
    galleryItems = document.querySelectorAll(".gallery-item img");
    for(let i = 0; i <galleryItems.length; i++){
        galleryItems[i].onclick = showHide;
    }
};

//Simply changes display type
function showHide(e){
    let description = document.querySelector(`#description-${e.target.dataset.number}`);
    if(description.style.display != "block") {description.style.display = "block";}
    else {description.style.display = "none";}
}