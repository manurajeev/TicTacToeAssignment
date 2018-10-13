/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let gameOver = false;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    if(!grid[colIdx][rowIdx]) {  //Check if the cell is already filled
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        check();
        computerMove();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkWinner(cell1,cell2,cell3) {
    if(grid[cell1[0]][cell1[1]] == 1 && grid[cell2[0]][cell2[1]] == 1 && grid[cell3[0]][cell3[1]] == 1) {
        alert('Player has won');
        gameOver = true;
     }
    else if(grid[cell1[0]][cell1[1]] == 2 && grid[cell2[0]][cell2[1]] == 2 && grid[cell3[0]][cell3[1]] == 2) {
        alert('Computer has won');
        gameOver = true;
    }
}

//Check Combinations
function check(){
    checkWinner([0,0],[0,1],[0,2]);
    checkWinner([1,0],[1,1],[1,2]);
    checkWinner([2,0],[2,1],[2,2]);
    checkWinner([0,0],[1,0],[2,0]);
    checkWinner([0,1],[1,1],[2,1]);
    checkWinner([0,2],[1,2],[2,2]);
    checkWinner([0,0],[1,1],[2,2]);
    checkWinner([2,0],[1,1],[0,2]);
}

function computerMove() {
    var emptyCells = [];
    for (let colIdx = 0;colIdx < grid.length; colIdx++) {
        var tempArray = grid[colIdx];
        for (let rowidx = 0; rowidx < tempArray.length;rowidx++) {
            if(tempArray[rowidx] == 0){
               emptyCells.push([colIdx,rowidx]);             
            }
        }
    }     
    if(emptyCells.length>0 && !gameOver) {
        var random = Math.ceil(Math.random() * emptyCells.length) - 1;
        grid[emptyCells[random][0]][emptyCells[random][1]] = 2;
        renderMainGrid();
        addClickHandlers();
        check();
    }
}


function resetGrid() {
    for (let colIdx = 0;colIdx < grid.length; colIdx++) {
        var tempArray = grid[colIdx];
        for (let rowidx = 0; rowidx < tempArray.length;rowidx++) {
            tempArray[rowidx] = 0;
        }
    }
    gameOver = false;
    renderMainGrid();
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();
