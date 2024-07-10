const grid = document.getElementById('grid');
const msg = document.getElementById('.message');
const choice = document.querySelector('form');
let mark;
let cells;

function setPlayer() {
    mark = this.value;
    msg.textContent = mark + ', click on a square to make your move!';
    choice.classList.add('good-luck');
    this.checked = false;
    buildGrid();
}

function playerMove() {
    if (this.textContent == '') {
        this.textContent = mark;
        checkRow();
        switchMark();
        computerMove();
    }
}

function computerMove () {
    let emptyCells = [];
    let random;

    cells.forEach(function(cell){
        if (cell.textContent == '') {
            emptyCells.push(cell);
        }
    });

random = Math.ceil(Math.random() * emptyCells.length) -1;
emptyCells[random].textContent = mark;
checkRow();
switchMark();
}

function switchMark() {
    if (makr == 'X') {
        mark = 'O';
    } else {
        mark = 'X';
    }
}

function winner(a, b, c) {
    if (a.textContent == mark && b.textContent == mark && c.textContent ==mark) {
        msg.textContent = mark + ' is the winner!';
        a.classList.add('winner');
        b.classList.add('winner');
        c.classList.add('winner');
        return true;
    } else {
        return false;
    }
}

function checkRow() {
    winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')); 
    winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
    winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
    winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
    winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
    winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
    winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
    winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

function resetGrid() {
    mark = 'X';

    cells.forEach(function(cell){
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    msg.textContent = 'Choose your player:';
    choice.classList.remove('good-luck');
    grid.innerHTML = '';
}
 
function buildGrid() {
    for (let i = 1; i <= 9; i++) {
        let cell = document.createElement('li');
        cell.id = 'c' + i;
        cell.addEventListener('click', playerMove, false);
        grid.appendChild(cell);
    }

    cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}

let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
    choice.addEventListener('click', setPlayer, false);
});

let resetButton = choice.querySelector('button');
resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    resetGrid();
})