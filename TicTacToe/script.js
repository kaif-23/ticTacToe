let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector(".turn-indicator");
let xscoreBoard = document.querySelector("#x-score");
let oscoreBoard = document.querySelector("#o-score");

let turnO =true;
let count = 0;
let xscore = 0;
let oscore = 0;
let lastWinner ="";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const initializeGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgConatiner.classList.add("hide");
    count = 0;
    if(lastWinner==="O"){
        turnO=true;
        turnIndicator.innerText="Player O's Turn";
    }
    else{
    turnO = false;
    turnIndicator.innerText = "Player X's Turn";}
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
            turnIndicator.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            turnO = true;
            turnIndicator.innerText = "Player O's Turn";
        }

        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (!isWinner && count === 9) {
            gameDraw();
        }

    });
});

const gameDraw = () => {
    msg.innerText = "Game Draw.";
    msgConatiner.classList.remove("hide");
    disabledBoxes();
};

const disabledBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    msgConatiner.classList.remove("hide");
    disabledBoxes();
    if (winner === "X") {
        xscore++;
        xscoreBoard.innerText = xscore;
        lastWinner="X";
    } else {
        oscore++;
        oscoreBoard.innerText = oscore;
        lastWinner="O"
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    xscore = 0;
    oscore = 0;
    xscoreBoard.innerText = xscore;
    oscoreBoard.innerText = oscore;
    initializeGame();
};

newGameBtn.addEventListener("click", initializeGame);
resetbtn.addEventListener("click", resetGame);

initializeGame();
