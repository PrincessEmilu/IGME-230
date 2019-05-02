"use strict"

//Declare varaibles
let galleryItems;

//When the window loads, set up event handling
window.onload = (e) =>{
    galleryItems = document.querySelectorAll(".gallery-item img");
    galleryItems[0].onclick = showHide;
    galleryItems[1].onclick = showHide;
    galleryItems[2].onclick = showHide;
    galleryItems[3].onclick = showHide;
};

//Simply changes display type
function showHide(e){
    let description = document.querySelector(`#description-${e.target.dataset.number}`);
    if(description.style.display != "block") {description.style.display = "block";}
    else {description.style.display = "none";}
}