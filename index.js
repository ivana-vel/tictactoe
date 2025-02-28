const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const cellContainer = document.querySelector("#cellContainer");
const pick = document.querySelector("#pick");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let computer = "O";
let running = false;
let counter = 1;

initializeGame();
function initializeGame() {
    currentPlayer = "X";
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
    if (running){
        switch(counter){
            case 1:
                setTimeout(firstMove, 600);
                break;
            case 2:
                setTimeout(secondMove, 600);
                break;
            case 3:
                setTimeout(thirdMove, 600);
                break;
            case 4:
                setTimeout(thirdMove, 600);
                break;
        }
    }
    counter += 1;
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    if (currentPlayer == "X"){
        var x = cell.querySelector('.x');
        x.style.visibility = "visible";
    }
    else if (currentPlayer == "O"){
        var o = cell.querySelector('.o');
        o.style.visibility = "visible";
    }
}


function checkWinner(){
    let roundWon = false;

    for( let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            if (cellA == "computer"){
                winner = "computer";
            }
            else {
                winner = currentPlayer;
            }
            break;
        }
    }
    if (roundWon){
        if (winner == "computer"){
            statusText.textContent = "You lose!";
        } 
        else{
            statusText.textContent = "You win!";
        }
        
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
}

function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = ``;
    cells.forEach(cell => {
        var x = cell.querySelector('.x');
        x.style.visibility = "hidden";
        var o = cell.querySelector('.o');
        o.style.visibility = "hidden";
    });
    running = true;
    counter = 1;
    initializeGame();
}

//computer plays
function firstMove(cell){
    console.log(counter);
    console.log(options[4]);
    if (counter == 2 && options[4] != ""){
        randomMove = Math.floor(Math.random() * 9);
        console.log(randomMove)
        while(randomMove != 0 && randomMove != 2 && randomMove != 6 && randomMove != 8){
            randomMove = Math.floor(Math.random() * 9);
            console.log(randomMove);
        }
    } 
    else {
        randomMove = Math.floor(Math.random() * 9);
        while(options[randomMove] != ""){
            randomMove = Math.floor(Math.random() * 9);
        }
    }
    computerPlays(randomMove);
}

function secondMove(){
    moveOption = -1;
    moveOption = checkX();
    
    if (moveOption == -1 || moveOption == randomMove){
        moveOption = checkO();
    }

    if(moveOption == -1){
        firstMove();
    }
    else {
        computerPlays(moveOption);
    }   
}

function thirdMove(){
    moveOption = -1;
    moveOption = checkO2();

    if(moveOption == -1){
        checkX();
    }
    if(moveOption == -1){
        checkO();
    }
    if(moveOption == -1){
        firstMove();
    } else {
        computerPlays(moveOption);
    }
    checkWinner();
}

function computerPlays(move){
    options[move] = "computer";
    let cell = cells[move];
    var comp;
    if (computer == "X"){
        comp = cell.querySelector('.x');
    }
    else{
        comp = cell.querySelector('.o');
    }  
    comp.style.visibility = "visible";
}


function checkX() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" && cellB == "" && cellC == "") {
            continue;
        }
        if(cellA != "" && cellB != "" && cellC != ""){
            continue;
        }
        else if(cellA == cellB && (cellA != "")){
            moveOption = winConditions[i][2];
            break;
        }
        else if(cellC == cellB && (cellC != "")){
            moveOption = winConditions[i][0];
            break;
        }
        else if(cellA == cellC && (cellA != "")){
            moveOption = winConditions[i][1];
            break;
        }
        else{
            moveOption = -1;
        }
    }
    return moveOption;
}

function checkO() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "computer"){
            if(cellB == "" && cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
        if(cellB == "computer"){
            if(cellA == "" && cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
        if(cellC == "computer"){
            if(cellB == "" && cellA == "") {
                moveOption = winConditions[i][0];
                i = winConditions.length;
            }
        }
    }
    return moveOption;
}

function checkO2() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "computer" && cellC == "computer"){
            if(cellB == "") {
                moveOption = winConditions[i][1];
                i = winConditions.length;
            }
        }
        if(cellB == "computer" && cellC == "computer"){
            if(cellA == "") {
                moveOption = winConditions[i][0];
                i = winConditions.length;
            }
        }
        if(cellA == "computer" && cellB == "computer"){
            if(cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
    }
    return moveOption;
}