const cells= document.querySelectorAll('.cell');
let cellsContent; updateArray();
let turn = true;

const victoryPatterns = [[0,1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]];
cells.forEach((cell, index) => {
    cell.addEventListener('click', function() {
        if (cell.textContent === "") {
            cell.textContent = turn? 'X' : 'O';
            updateArray();
            setTimeout(checkVictory, 10);
            setTimeout(checkDraw, 10);
        }
    });
});

function updateArray() {
    cellsContent = Array.from(cells).map(cell => cell.textContent);
}

function checkVictory() {
    victoryPatterns.forEach(pattern => {
        let count = 0;
        pattern.forEach(index => {
            if (cellsContent[index] === (turn ? 'X' : 'O')) {
                count++;
            }
        });
        if (count === 3) {
            alert("Victory of " + (turn ? 'X' : 'O') + "!");
            clearBoard();
        }
    });
    turn = !turn;

}

function clearBoard() {
    cells.forEach(cell => {
        cell.textContent = "";
    });
    updateArray();
}

function checkDraw() {
    if (!cellsContent.includes("")) {
        alert("Draw!");
        clearBoard();
    }
}