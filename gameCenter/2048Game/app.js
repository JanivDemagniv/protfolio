//general varables
let board;
let score = 0;
let rows = 4;
let columns = 4;
let gameStarted = false

//buttons
const startBtn = document.getElementById('startBtn')

//starting game
startBtn.addEventListener('click', () => {
    document.getElementById('board').innerHTML = ''
    setGame()
    startBtn.innerText = 'Reset'
});


//set game - starting the game function
function setGame() {
    gameStarted = true
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile)
        }
    }

    setTwo()
    setTwo();

}

// checking for a spot on board
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true
            }
        }
    }
    return false
}


//set two blocks on the board
function setTwo() {
    if (!hasEmptyTile()) {
        return
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true
        }
    }
}

//update the tile
function updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add('x8192')
        }
    }
}

//keys function on the keyboard
document.addEventListener('keyup', (e) => {
    if (!gameStarted) {
        return
    }
    if (e.code == "ArrowLeft") {
        slideLeft()
        setTwo()
    } else if (e.code == "ArrowRight") {
        slideRight()
        setTwo()
    } else if (e.code == "ArrowUp") {
        slideUp()
        setTwo()
    } else if (e.code == "ArrowDown") {
        slideDown()
        setTwo()
    }
    document.getElementById('score').innerText = score
})

//clearing out the zeros from the board
function filterZero(row) {
    return row.filter((num) => num != 0)
}

//handle slides on board
function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i]
        }
    }
    row = filterZero(row);

    while (row.length < columns) {
        row.push(0)
    }

    return row
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse()
        row = slide(row);
        row.reverse()
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);


        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse()

        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

// create mobile toch events
let startX, startY, endX, endY;

document.addEventListener('touchstart', function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}, false);

document.addEventListener('touchmove', function (event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}, false);

document.addEventListener('touchend', function () {
    const diffX = endX - startX;
    const diffY = endY - startY;



    //direction of the swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            slideRight()
            setTwo()
        }
        if (diffX < 0) {
            slideLeft()
            setTwo()
        }
    } else {
        if (diffY > 0) {
            slideDown()
            setTwo()
        }
        if (diffY < 0) {
            slideUp()
            setTwo()
        }
    }
}, false);

