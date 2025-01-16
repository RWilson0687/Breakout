//This code is a JavaScript implementation for a simple game called "Breakout."
const grid = document.querySelector ('.grid')
const scoreDisplay = document.querySelector ('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
const gameTitle = "Breakout"
const ballStart = [270, 40]
const userStart = [230, 10]
const restartButton = document.getElementById('restart-button'); // Replace with your button's ID
restartButton.onclick = refreshPage;
let timerID
let xDirection = -2
let yDirection = 2
let score = 0
let paused = false; // Tracks whether the game is paused

//Function to refresh the page
function refreshPage() {
    location.reload(); // Reloads the page
}

// Function to toggle the game state (pause/resume)
function pauseGame() {
    if (paused) {
        // Resume the game
        paused = false;
        timerID = setInterval(moveBall, 30); // Restart the ball movement
        document.getElementById("pauseButton").innerText = "Pause"; // Change button text to "Pause"
    } else {
        // Pause the game
        paused = true;
        clearInterval(timerID); // Stop the ball movement
        document.getElementById("pauseButton").innerText = "Resume"; // Change button text to "Resume"
    }
}

// Add event listener for the Pause button
document.getElementById("pauseButton").addEventListener("click", pauseGame);


//User Start Position: This code sets up the initial positions for a user-controlled object (a paddle) and a ball.

let currentPosition = userStart
let ballCurrentPosition = ballStart


/* Create BLOCK: This code defines a Block class. */
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.TopRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//All my blocks: This code creates an array of Block objects, which are part of a game environment similar to "Brick Breaker" or "Pong."
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//drag my block: This code defines a function called addBlock that creates visual representations of the blocks in a game.
function addBlock () {

for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement ('div')
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlock()

//add user: This code creates and displays a user-controlled object (a paddle) in game.
const user = document.createElement ('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user: The drawUser function is responsible for positioning the user-controlled object (a paddle) on the game grid.
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball: The drawUser function updates the position of the user element on the game grid according to the coordinates stored in currentPosition.
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user: The drawBall function updates the position of the ball on the game grid according to the coordinates stored in ballCurrentPosition.
function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser() 
            }
            break;

        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] +=10
                drawUser()
            }
            break;

        case moveLeft:
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] +=10
                drawUser()
            }
            break;

        case 'a':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser() 
            }
            break;

        case 'd':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] +=10
                drawUser()
            }
            break;
    }
}

// Function to move the user left via the button click
function moveLeft() {
    if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;  // Move left
        drawUser();
    }
}

// Function to move the user right via the button click
function moveRight() {
    if (currentPosition[0] > 0) {
        currentPosition[0] += 10;  // Move left
        drawUser();
    }
}

document.addEventListener('keydown', moveUser)

// Add event listener for the Move Left button click
document.getElementById("moveLeft").addEventListener("click", moveLeft);

// Add event listener for the Move Left button click
document.getElementById("moveRight").addEventListener("click", moveRight);




//add ball: This code creates and displays the ball in the game environment.
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move the ball: The moveBall function handles the movement of the ball within the game.
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

let gameStarted = false; // This flag will prevent the game from starting automatically

function startGame() {
    if (gameStarted) {
        // If the game has already started, do nothing
        return;
    }

    gameStarted = true;

    // Initialize the user and ball
    currentPosition = userStart;
    ballCurrentPosition = ballStart;
    score = 0;
    scoreDisplay.innerHTML = score;
    
    // Reset blocks (optional: if you want to reset blocks)
    //blocks.length = 0;
    //addBlock();

    // Add event listeners for movement
    document.addEventListener('keydown', moveUser);
    
    // Start the game loop (move ball)
    timerID = setInterval(moveBall, 30); // Start the ball's movement

    // Draw user and ball
    drawUser();
    drawBall();
}

// Add event listener for the Start Game button
document.getElementById("startGameButton").addEventListener("click", startGame);

//check for collisions: The checkForCollisions function is responsible for detecting various types of collisions in the game.
//Such includes collisions with blocks, walls, the user-controlled paddle, and game over conditions.
function checkForCollisions() {

    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            
            //check for win
            if (blocks.length === 0) {
                clearInterval(timerID)
                scoreDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keydown', moveUser)
            }

        }
    }

    // check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)  ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection() 

    }

    //check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    //check for game over
    if (ballCurrentPosition[1] <=0 ) {
        clearInterval(timerID)
        scoreDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keydown', moveUser)

    }
}

//Change Ball Direction: The changeDirection function is responsible for altering the movement direction of the ball when it collides with different objects in the game.
function changeDirection() {
        if (xDirection === 2 && yDirection === 2){
            yDirection = -2
            return
        }
        if (xDirection === 2 && yDirection === -2){
            xDirection = -2
            return
        }
        if (xDirection === -2 && yDirection === -2) {
            yDirection = 2
            return
        }
        if (xDirection === -2 && yDirection === 2){
            xDirection = 2
            return
        }
}

