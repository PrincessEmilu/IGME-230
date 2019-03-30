

// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

// 2
let displayTerm = "";

// 3
function searchButtonClicked(){
    console.log("searchButtonClicked() called");

    //Declare GIPHY_URL
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    //Keys are used to accessing APIs.
    let GIPHY_KEY = "2v0ZHZ3TLXaOBk6mpZ7kkk0ye8UuVN0G";

    //Build up URL string with our data
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    //Parse the user-entered term
    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    //Sanitize input!
    term = term.trim();

    //encode spaces and spcieal characters
    term = encodeURIComponent(term);

    //Bail out of the function if we are left with nothing
    if(term.length < 1) return;

    //append search term to the url, parameter name is 'q'
    url += "&q=" + term;

    //Get user-chose search limit and append to URL
    //let limit = document.querySelector("#limit").value;
    url += "&limit=" + document.querySelector("#limit").value;

    //Update the UI
    document.querySelector("#status").innerHTML =
        "<b>Searching for '" + displayTerm + "'</b>";

    //View what url looks like
    console.log(url);

    // 12 Request data!
    getData(url);
}


//This function is for actually retriving requested data
function getData(url){
    //Create a new XHR object
    let xhr = new XMLHttpRequest();

    //Set the onload handler
    xhr.onload = dataLoaded;

    //Set the onerror handler
    xhr.onerror = dataError;

    //Open connection and send the request
    xhr.open("GET",url);
    xhr.send();
}

//Callback functions
function dataLoaded(e){
    //event.target is the xhr object
    let xhr = e.target;

    //xhr.responsetext is the json file we just downloaded
    console.log(xhr.responseText);

    //turn text into parsable javacript object
    let obj = JSON.parse(xhr.responseText);

    //if no results, print message and return
    if(!obj.data || obj.data.length == 0){
        document.querySelector("#status").innerHTML =
            "<b>No results found for '" + displayTerm + "'</b>";
            return;
    }

    //Start building the HTML for the user
    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString =
        "<p>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    //loop through the array of results
    for (let i=0; i< results.length;i++)
    {
        let result = results[i];

        //Get the url to the gif
        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        //Get URL to the giphy page
        let url = result.url;

        //Get the rating
        let rating = result.rating.toUpperCase();

        //Build a div to hold each result, using ES6 templating
        let line =
            `<div class='result'><img src='${smallURL}' title='${result.id}'/>`;

        line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span><span>Rating: ${rating}</span></div>`;

        //Add the div to bigString and loop
        bigString += line;
    }

    //All done builing the HTML, show it to the user
    document.querySelector("#content").innerHTML = bigString;

    //update status
    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e){
    console.log("An error occurred");
}
