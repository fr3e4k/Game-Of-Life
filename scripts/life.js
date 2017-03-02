var rows = 24;
var cols = 24;

// initialize
function initialize() {
    createTable();
    
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

// start everything
window.onload = initialize;