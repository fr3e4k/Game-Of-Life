var rows = 24;
var cols = 24;
var playing = false;
var timer;
var reproductionTime = 100;

var grid = new Array(rows);
var nextGrid = new Array(rows);

// initialize grids
function initializeGrids() {
    for(var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

// reset grids
function resetGrids() {
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

// copy the nextGrid to grid and reset grid
function copyAndResetGrid() {
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}


// initialize
function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setUpControlButtons();
}

// lay out the grid
function createTable() {
    var gridContainer = document.getElementById("gridContainer");
    if( !gridContainer ) {
        // throw error
        console.error("Problem: no div for the grid table!");
    }
    
    var table = document.createElement("table");
    
    for(var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for(var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
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
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];
    
    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
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

// update the view
function updateView() {
    for(var i =0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            var cell = document.getElementById(i + "_" + j);
            if(grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
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
        clearTimeout(timer);
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
    computeNextGen();
    
    if(playing){
        timer = setTimeout(play, reproductionTime);
    }
}

// compute the next generation
function computeNextGen() {
    for(var i = 0; i < rows; i++){
        for(j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }
    
    // copy nextGrid to grid, and reset nextGrid
    copyAndResetGrid();
    // copy all 1 values to "live" in the table
    updateView();
}


// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// apply the rules of the game
function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if( grid[row][col] == 1) {
        if( numNeighbors < 2 ) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if( numNeighbors > 3 ) {
            nextGrid[row][col] = 0;
        }
    } else if(grid[row][col] == 0) {
        if( numNeighbors == 3 ){
            nextGrid[row][col] = 1;
        }
    }
}

// count the neighbors around a particular cell location
function countNeighbors(row, col) {
    var count = 0;
    // check if an upper row exists
    if(row-1 >= 0) {
        // neighbor directly on top
        if( grid[row-1][col] == 1){
            count++;
        }
    }
    // check if an upper row with left column exists
    if( row-1 >= 0 && col-1 >= 0 ) {
        // neighbor on top left side
        if( grid[row-1][col-1] == 1) {
            count++;
        }
    }
    // check if an upper row with right column exists
    if(row-1 >= 0 && col+1 < cols) {
        // neighbor on top right
        if( grid[row-1][col+1] == 1 ) {
            count++;
        }
    }
    // check if left column exists
    if(col-1 >= 0){
        // neighbor on immediate left
        if(grid[row][col-1] == 1){
            count++;
        }
    }
    // check if right column exists
    if(col+1 < cols) {
        // neighor on immediate right
        if(grid[row][col+1] == 1) {
            count++;
        }
    }
    // check if a bottom row exists
    if(row+1 < rows){
        // neighbor directly below
        if(grid[row+1][col] == 1) {
            count++;
        }
    }
    // check if a bottom row with left column exists
    if(row+1 < rows && col-1 >= 0) {
        // neighbor on bottom left side
        if(grid[row+1][col-1] == 1){
            count++;
        }
    }
    // check if a bottom row with right column exists
    if(row+1 < rows && col+1 < cols) {
        // neighbor on bottom right side
        if(grid[row+1][col+1] == 1){
            count++
        }
    }
    return count;
    
}

// start everything
window.onload = initialize;