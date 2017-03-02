var rows = 24;
var cols = 24;

var playing = false;

// initialize
function initialize() {
    createTable();
    setUpControlButtons();
}

// lay out the grid
function createTable() {
    var gridContainer = document.getElementById("gridContainer");
    if(!gridContainer) {
        // throw error
        console.error("Problem: no div for the grid table!");
    }
    
    var table = document.createElement("table");
    
    for(var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for(var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "-" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

// click handler
function cellClickHandler(eventObj) {
    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
    } else {
        this.setAttribute("class", "live");
    }
    /*
    var cell = eventObj.target;
    var className = cell.class; // this doesn't work, cell.getAttribute("class") does
    console.log(cell.id); // this works
    console.log(cell.class); // this doesn't, why?
    if(className === "dead"){
        cell.class = "live"; // doesn't work, cell.setAttribute("class", "live") does
    } else {
        cell.class = "dead"; // cell.setAttribute("class", "dead") works
    }
    */
}

// set up contol buttons
function setUpControlButtons() {
    // button to start
    var startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;
    
    // butto to clear
    var clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;
}

// start button handler
function startButtonHandler() {
    if(playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "continue";
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "pause";
        play();
    }
}

// clear button handler
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    playing = false;
    var startButton = document.getElementById("start");
    startButton.innerHTML = "start";
}

// run the game of life
function play() {
    console.log("Play the game");
}

// start everything
window.onload = initialize;