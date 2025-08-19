let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");
let newBtn = document.querySelector("#new-btn");
let winnerMsg = document.querySelector(".win-msg");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let gameOver = false;

const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Add event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Prevent click if game is over or box already filled
        if (gameOver || box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#B084CC";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#665687";
            turnO = true;
        }

        box.disabled = true;
        count++;
        checkwinner();
        drawGame();
    });
});

const drawGame = () => {
    if (count === 9 && !gameOver) {
        msg.innerText = `Out of Moves, Game Draw`;
        winnerMsg.classList.remove("hide");
        disablegame();
    }
};

const resetgame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enablegame();
    winnerMsg.classList.add("hide");
};

const disablegame = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enablegame = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Optional: Reset color
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    winnerMsg.classList.remove("hide");
    gameOver = true;
    disablegame();
};

const checkwinner = () => {
    for (let pattern of win) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // Stop checking further patterns
            }
        }
    }
};

resetBtn.addEventListener("click", resetgame);
newBtn.addEventListener("click", resetgame);
