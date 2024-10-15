//This code is a JavaScript implementation for a simple game called "Breakout."
const grid = document.querySelector ('.grid')
const scoreDisplay = document.querySelector ('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let timerID
let xDirection = -2
let yDirection = 2
let score = 0
/*
Element Selection:
    const grid = document.querySelector ('.grid'): This selects the HTML element with the class grid, which serves as the game area or playing field.
    const scoreDisplay = document.querySelector ('#score'): This selects the element with the ID score, where the player's score will be displayed.
Constants for Game Dimensions:
    const blockWidth = 100: This sets the width of each block (or brick) in the game.
    const blockHeight = 20: This sets the height of each block.
    const ballDiameter = 20: This sets the diameter of the ball used in the game.
    const boardWidth = 560: This defines the width of the game board.
    const boardHeight = 300: This defines the height of the game board.
Game Variables:
    let timerID: This variable will hold the ID of the timer, which is used to control the game's animation or update intervals.
    let xDirection = -2: This sets the initial horizontal direction of the ball's movement. A negative value means the ball will move left.
    let yDirection = 2: This sets the initial vertical direction of the ball's movement. A positive value means the ball will move down.
    let score = 0: This initializes the player's score to zero.
Summary:
    This code sets up the basic configuration and state for a simple game involving a grid, a ball, and scoring. 
    The game involves moving the ball around the grid, hitting blocks, and tracking the player's score as they play. 
    Further implementation includes handling user input, ball movement, collision detection, and displaying the players score.
*/

//User Start Position: This code sets up the initial positions for a user-controlled object (a paddle) and a ball.
const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart
/*
User Start Position:
    const userStart = [230, 10]: This defines the starting position of the user object (e.g., a paddle) as an array with two elements: 230 (x-coordinate) and 10 (y-coordinate). 
    The coordinates represent a point on the game grid or canvas.
    let currentPosition = userStart: This initializes currentPosition to userStart, indicating that the current position of the user object starts at the defined coordinates.
Ball Start Position:
    const ballStart = [270, 40]: This defines the starting position of the ball as an array with two elements: 270 (x-coordinate) and 40 (y-coordinate).
    let ballCurrentPosition = ballStart: This initializes ballCurrentPosition to ballStart, indicating that the current position of the ball starts at its defined coordinates.
Summary:
    This code sets up initial positions for a user object and a ball in a game environment. 
    The coordinates denote their placements on a 2D grid, where the game will involve moving these objects in response to user input and game mechanics.
*/

/* Create BLOCK: This code defines a Block class. */
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.TopRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
/*
Class Definition:
    class Block {: This defines a new class named Block. Classes in JavaScript are blueprints for creating objects with shared properties and methods.
Constructor Method:
    constructor(xAxis, yAxis){: The constructor method is called when a new instance of the class is created. It takes two parameters, xAxis and yAxis, which represent the coordinates for positioning the block.
Properties:
    this.bottomLeft = [xAxis, yAxis]: This defines the bottom-left corner of the block using the provided xAxis and yAxis coordinates.
    this.bottomRight = [xAxis + blockWidth, yAxis]: This calculates the bottom-right corner of the block by adding blockWidth to the xAxis coordinate.
    this.topLeft = [xAxis, yAxis + blockHeight]: This calculates the top-left corner of the block by adding blockHeight to the yAxis coordinate.
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]: This calculates the top-right corner of the block.
Summary:
    The Block class allows for the creation of block objects, each defined by its corners based on a starting position (given by xAxis and yAxis). 
    This structure is useed for representing blocks in a game where the player interacts with them, such as hitting them with a ball. 
    The properties define the coordinates of each corner, which can be used for collision detection and rendering on a game canvas.
*/

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
/*
Array Declaration:
    const blocks = [: This initializes a constant array named blocks, which will hold multiple instances of the Block class.
Creating Block Instances:
        The array is populated with multiple block objects created using the new Block(xAxis, yAxis) syntax.
        Each Block is instantiated with specific x and y coordinates, which determine its position on the game grid.
Coordinates:
        The blocks are created in a grid-like structure:
            The first row of blocks is at y-coordinate 270, with x-coordinates ranging from 10 to 450 in increments of 110.
            The second row is at 240, and the third row at 210, following the same pattern.
        This creates three horizontal rows of blocks, each with five blocks per row.
Summary:
    The blocks array contains multiple Block instances, organized in a grid. This setup is for when players must hit or interact with blocks. 
    The arrangement of blocks is important for gameplay mechanics, such as collision detection, scoring, and visual layout. 
    Each block's position is defined by its x and y coordinates, which are passed to the Block class constructor.
*/

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
/*
Function Definition:
    function addBlock () {: This defines a function named addBlock. When called, this function will add blocks to the game grid.
Loop Through Blocks:
    for (let i = 0; i < blocks.length; i++) {: This loop iterates over each block in the blocks array.
Create Block Elements:
    const block = document.createElement('div'): For each iteration, a new <div> element is created. This <div> will represent a block in the game.
Add Class:
    block.classList.add("block"): The class "block" is added to the newly created <div>. This allows for styling the blocks using CSS.
Set Position:
    block.style.left = blocks[i].bottomLeft[0] + 'px': The left position of the block is set using the x-coordinate of its bottom-left corner, converting it to a pixel value.
    block.style.bottom = blocks[i].bottomLeft[1] + 'px': The bottom position of the block is set using the y-coordinate of its bottom-left corner, also converting it to a pixel value.
Append to Grid:
    grid.appendChild(block): The newly created block is appended to the grid element in the DOM, making it visible on the page.
Function Call:
    addBlock(): This line calls the addBlock function, executing the code inside it and adding all the blocks to the grid.
Summary:
    The addBlock function dynamically creates visual block elements based on the blocks array and adds them to the game grid. 
    Each block is styled and positioned according to its coordinates, allowing them to be rendered on the screen as part of the game interface. 
    This setup is essential for gameplay, as it visually represents the targets or obstacles that players will interact with.
*/

//add user: This code creates and displays a user-controlled object (a paddle) in game.
const user = document.createElement ('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)
/*
Create User Element:
    const user = document.createElement('div'): This line creates a new <div> element, which will represent the user-controlled object in the game.
Add Class:
    user.classList.add('user'): The class "user" is added to the <div>. This allows for styling the user element using CSS, enabling you to define its appearance, such as size, color, and position.
Draw User:
    drawUser(): This function is responsible for positioning the user element on the grid and updating its appearance. 
    It involves setting the style properties of the user element to match its intended position on the game board.
Append to Grid:
    grid.appendChild(user): The user element is appended to the grid element in the DOM. This makes the user element visible on the game grid, allowing it to interact with other game elements.
Summary:
    This code effectively creates a visual representation of a user-controlled object (a paddle) and adds it to the game grid.
    The drawUser() function is essential for correctly positioning and styling the user element, while the final line ensures it becomes part of the visible game interface. 
    This setup is crucial for user interaction in the game.
*/

//draw the user: The drawUser function is responsible for positioning the user-controlled object (a paddle) on the game grid.
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}
/*
Function Definition:
    function drawUser() {: This defines a function named drawUser.
Set User Position:
    user.style.left = currentPosition[0] + 'px': This line sets the left CSS property of the user element. It positions the element horizontally based on the x coordinate from the currentPosition array. 
        The value is appended with 'px' to specify that it is in pixels.
    user.style.bottom = currentPosition[1] + 'px': This line sets the bottom CSS property of the user element. 
        It positions the element vertically based on the y coordinate from the currentPosition array, also in pixels.
Summary
    The drawUser function updates the position of the user element on the game grid according to the coordinates stored in currentPosition. 
    By adjusting the left and bottom CSS properties, it effectively moves the user-controlled object to the desired location, allowing for interaction within the game environment. 
    This function would typically be called whenever the user’s position needs to be updated, such as in response to user input or during game updates.
*/

//draw the ball: The drawUser function updates the position of the user element on the game grid according to the coordinates stored in currentPosition.
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}
/*
Function Definition:
    function drawBall() {: This defines a function named drawBall.
Set Ball Position:
    ball.style.left = ballCurrentPosition[0] + 'px': This line sets the left CSS property of the ball element. It positions the ball horizontally based on the x coordinate from the ballCurrentPosition array. 
        The value is appended with 'px' to specify that it is in pixels.
    ball.style.bottom = ballCurrentPosition[1] + 'px': This line sets the bottom CSS property of the ball element. 
        It positions the ball vertically based on the y coordinate from the ballCurrentPosition array, also in pixels.
Summary
    The drawBall function updates the position of the ball on the game grid according to the coordinates stored in ballCurrentPosition. 
    By adjusting the left and bottom CSS properties, it effectively moves the ball to the specified location. 
    This function is typically called whenever the ball’s position changes, such as during the game loop or in response to collision detection and movement logic.
*/

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

document.addEventListener('keydown', moveUser)
/*
Function Definition:
    function moveUser(e) {: This defines a function named moveUser, which takes an event object e as an argument.
Switch Statement for Key Handling:
    switch(e.key){: This evaluates the key pressed by the user and executes different actions based on the key value.
Arrow Key Controls:
    case 'ArrowLeft':: This case checks if the left arrow key is pressed.
        Movement Logic:
            if (currentPosition[0] > 0) {: Ensures the user object doesn't move off the left edge of the board.
            currentPosition[0] -= 10: Moves the user 10 pixels to the left.
            drawUser(): Calls the drawUser function to update the user's position on the grid.
    break;: Exits the switch statement.
    case 'ArrowRight':: This case checks if the right arrow key is pressed.
        Movement Logic:
            if (currentPosition[0] < boardWidth - blockWidth) {: Ensures the user object doesn't move off the right edge of the board.
            currentPosition[0] += 10: Moves the user 10 pixels to the right.
            drawUser(): Calls the drawUser function to update the user's position.
Alternative Controls (A and D Keys):
    case 'a':: Checks if the 'A' key is pressed for moving left.
    case 'd':: Checks if the 'D' key is pressed for moving right.
    The logic for these cases is similar to the arrow keys, allowing the user to control movement using either key set.
Event Listener:
    document.addEventListener('keydown', moveUser): This line adds an event listener to the document that listens for keydown events (when a key is pressed). 
    When such an event occurs, it calls the moveUser function, passing the event object.
Summary
    The moveUser function enables the user-controlled object to move left or right in response to keyboard input. 
    It checks the current position to prevent the user from moving off the edges of the game board and calls drawUser() to update the visual representation after each movement. 
    The function supports both arrow keys and the 'A' and 'D' keys for flexibility in control.
*/

//add ball: This code creates and displays the ball in the game environment.
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)
/*
Create Ball Element:
    const ball = document.createElement('div'): This line creates a new <div> element, which will represent the ball in the game.
Add Class:
    ball.classList.add('ball'): The class "ball" is added to the <div>. This allows for styling the ball using CSS, enabling you to define its appearance, such as size, color, and shape.
Draw Ball:
    drawBall(): This function is responsible for positioning the ball on the grid and updating its appearance. 
    It involves setting the style properties of the ball element to match its intended position on the game board.
Append to Grid:
    grid.appendChild(ball): The ball element is appended to the grid element in the DOM. This makes the ball visible on the game grid, allowing it to interact with other game elements.
Summary
    This effectively creates a visual representation of the ball and adds it to the game grid. 
    The drawBall() function is crucial for correctly positioning and styling the ball element, while the final line ensures it becomes part of the visible game interface. 
    This setup is essential for the gameplay mechanics, as the ball will be a central element in the game’s interaction and movement.
*/

//move the ball: The moveBall function handles the movement of the ball within the game.
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerID = setInterval(moveBall, 30)
/*
Function Definition:
    function moveBall() {: This defines a function named moveBall.
Update Ball Position:
    ballCurrentPosition[0] += xDirection: This line updates the ball's x-coordinate by adding the value of xDirection. 
    If xDirection is positive, the ball moves to the right; if negative, it moves to the left.
    ballCurrentPosition[1] += yDirection: This line updates the ball's y-coordinate by adding the value of yDirection. 
    If yDirection is positive, the ball moves down; if negative, it moves up.
Draw Ball:
    drawBall(): This function (previously defined) is called to update the visual position of the ball on the grid. 
    It uses the updated coordinates in ballCurrentPosition to set the ball’s position.
Check for Collisions:
    checkForCollisions(): This function is responsible for checking whether the ball has collided with any objects in the game, such as the user-controlled paddle, blocks, or the edges of the game board. 
    Collision detection is crucial for determining how the ball should react (e.g., bouncing off walls or blocks).
Summary
    The moveBall function updates the ball's position based on its current direction and then calls drawBall() to visually reflect that movement. 
    It also checks for collisions to manage the ball's interactions within the game environment. 
    This function is called in a game loop to create the continuous movement of the ball.
*/

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
/*
Loop through Blocks:
    for (let i = 0; i < blocks.length; i++) {
        This loop iterates over each block in the blocks array.
Collision Detection:
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
            ) {
            This condition checks if the ball's position overlaps with the boundaries of the current block. It checks:
                If the ball's x-coordinate is within the horizontal bounds of the block.
                If the ball's y-coordinate (plus its diameter) is within the vertical bounds of the block.
Block Collision Response:
    If a collision is detected, the block is removed from the DOM and the blocks array, the ball's direction is changed, the score is incremented, and the score display is updated.
    Additionally, if all blocks are cleared, the game is won, the timer is stopped, and the user controls are disabled.
Check for Wall Collisions:
    This condition checks if the ball hits the walls of the game area:
        if (
            ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
            ballCurrentPosition[1] >= (boardHeight - ballDiameter)  ||
            ballCurrentPosition[0] <= 0
            ) {
    If the ball reaches the right or bottom edges (considering its diameter) or the left edge, it calls changeDirection() to make the ball bounce back.
Check for User Collisions:
    This condition checks if the ball collides with the user-controlled paddle:
        if (
            (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
            (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) {
    If the ball's position overlaps with the paddle's boundaries, it calls changeDirection() to reverse the ball's vertical direction.
Check for Game Over:
    This condition checks if the ball falls below the bottom edge of the game area:
        if (ballCurrentPosition[1] <= 0 ) {
    If this happens, the game is over, the timer is stopped, and a "You Lose" message is displayed. User controls are also disabled.
Summary:
    The checkForCollisions function effectively handles various collision detections and game state updates. 
    It checks for collisions with blocks, walls, and the paddle, adjusting the ball's direction accordingly. 
    It also manages win and lose conditions, making it a critical part of the game's logic and flow.
*/

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
/*
Function Definition:
    function changeDirection() {: This defines the function named changeDirection.
Direction Logic:
    The function uses a series of conditional statements to change the ball's xDirection and yDirection based on its current direction:
        First Condition:
            if (xDirection === 2 && yDirection === 2) {
            yDirection = -2
            return
            }
                If the ball is moving diagonally down and to the right (both directions are positive), this changes the vertical direction to upward by setting yDirection to -2.
        Second Condition:
            if (xDirection === 2 && yDirection === -2) {
            xDirection = -2
            return
            }
                If the ball is moving diagonally up and to the right, it changes the horizontal direction to left by setting xDirection to -2.
        Third Condition:
            if (xDirection === -2 && yDirection === -2) {
                yDirection = 2
                return
            }
        Fourth Condition:
            if (xDirection === -2 && yDirection === 2) {
                xDirection = 2
                return
            }
                If the ball is moving diagonally down and to the left, it changes the horizontal direction to right by setting xDirection to 2.
        Summary
            The changeDirection function updates the direction of the ball based on its current movement state. 
            It effectively handles the ball's behavior when it collides with various objects (such as walls, blocks, and the paddle), allowing for realistic bouncing mechanics. 
            Each conditional check corresponds to a specific collision scenario, ensuring the ball changes direction appropriately in response to its environment.
*/