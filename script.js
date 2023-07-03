const cells= document.querySelectorAll('.cell');
let cellsContent; updateArray();
let iconsChosen = false;
let turn = true;
const victoryPatterns = [[0,1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]];
const player1imgs = document.querySelectorAll(".player.one img");
const player2imgs = document.querySelectorAll(".player.two img");

const Player = (name, icon) => {
    icon='<img src="'+icon+'">';
    return {name, icon};
}

let player1 = Player("Player 1", "./icons/ztmy-icon-1.jpg");
let player2 = Player("Player 2", "./icons/ztmy-icon-4.jpg");

player1imgs.forEach(img => {
    img.addEventListener('click', () => {
        if (!iconsChosen) {
            player1 = Player("Player 1", img.src);
        }
    });
})

player2imgs.forEach(img => {
    img.addEventListener('click', () => {
        if (!iconsChosen) {
            player2 = Player("Player 2", img.src);
        }
    });
})
cells.forEach( (cell) => {
    cell.addEventListener('click', manageCellClick.bind(this, cell));
});

function manageCellClick(cell) {
    if (cell.innerHTML === "") {
        iconsChosen = true;
        cell.innerHTML = turn? player1.icon : player2.icon;
        updateArray();
        setTimeout(checkVictory, 10);
        setTimeout(checkDraw, 10);
    }
}
function updateArray() {
    cellsContent = Array.from(cells).map(cell => cell.innerHTML);
}

function checkVictory() {
    victoryPatterns.forEach(pattern => {
        let count = 0;
        pattern.forEach(index => {
            if (cellsContent[index] === (turn ? player1.icon : player2.icon)) {
                count++;
            }
        });
        if (count === 3) {
            alert("Victory of " + (turn ? player1.name : player2.name) + " !");
            clearBoard();
            turn = false;
            iconsChosen = false;
        }
    });
    turn = !turn;
}

function clearBoard() {
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    updateArray();
}

function checkDraw() {
    if (!cellsContent.includes("")) {
        alert("Draw!");
        clearBoard();
        turn = true;
        iconsChosen = false;
    }
}
