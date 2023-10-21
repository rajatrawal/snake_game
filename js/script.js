let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let scoreHTMl = document.getElementById("score");
let highscoreHTMl = document.getElementById("highscore");
let score = 0;
scoreHTMl.innerHTML = score;
if (localStorage.getItem("highscore") === null) {
    localStorage.setItem("highscore", 0);
    highscore = 0;

}
else {
    highscore = localStorage.getItem("highscore");
}
highscoreHTMl.innerText = "Your highscore is : " + highscore;
let speed = 5;
const bord = document.querySelector(".bord");
let snakeArr = [
    {
        x: 13, y: 15
    },

]
let foodArr = {
    x: 15, y: 3
};
lastPaintTime = 0;
// Game Function 
function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = cTime;
        gameEngine();

    }


}
function isCollide(snakeArr) {
    // if you bump in yourself
    for (let i = 1; i < snakeArr.length; i++) {
        const element = snakeArr[i];
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true
        }
    }
    if ((snakeArr[0].x >= 19 || snakeArr[0].x <= -1) || (snakeArr[0].y >= 19 || snakeArr[0].y <= -1)) {
        return true
    }

}


function gameEngine() {
    // Part 1 : Updating Snake arry
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {
            x: 0, y: 0
        };
        alert("Game Over . Press Any Key To Play Again !");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        speed = 5;
        scoreHTMl.innerHTML = score;



    }
    // If you have eaten the food , increment the scdore and regenerate the food
    if (snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x) {

        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        score += 1;
        speed += 0.10;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);

            highscoreHTMl.innerText = "Your highscore is : " + highscore;
        }
        scoreHTMl.innerHTML = score;


        let a = 1;
        let b = 18;
        while (true) {
            foodArr = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
            if (snakeArr.filter((e) => e.x == foodArr.x && e.y == foodArr.y).length === 0) {
                break;
            }
            else {
                console.log("241645456464578974");
                continue;
            }

        }
    }
    // Moving the snake


        for (let i = snakeArr.length - 2; i >= 0; i--) {

            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

    // Part 2 : Display the snake and food 
    // display snake

    // display food
    bord.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {

            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");

        }


        bord.appendChild(snakeElement);
    });

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodArr.y;
    foodElement.style.gridColumnStart = foodArr.x;
    foodElement.classList.add("food");
    bord.appendChild(foodElement);

}



// Main logic Starts Hear
window.requestAnimationFrame(main);


window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":




            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":

            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:

            break;
    }
});