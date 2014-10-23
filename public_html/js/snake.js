/*-------------------------------------------------
 * Variables
 * -------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;
/*-------------------------------------------------
 * Executing game code
 -------------------------------------------------- 
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

/*---------------------------------------------------
 * Game functions
 * ----------------------------------------------------
 */

/*the function will start the snake project once the tab is opened*/
function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler);
}
/*the function can take multiple executing game codes and loop it for an infinity amount of time*/
function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}
/*the function will create a screen where the snake can rome around*/
function gameDraw() {
    context.fillStyle = "rgb(148, 225, 255)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

/*-----------------------------------------------------
 * snake function
 * ----------------------------------------------------
 */
/* the function will start the snake in a specific direction*/
function snakeInitialize(){
    snake = [];
    snakeLength = 10;
    snakeSize = 25;
    snakeDirection = 'down';
    
    for(var index = snakeLength - 1; index >= 0; index--) {
    snake.push( {
         x: index,
         y: 0
    });    
  }
}
/*this funnction will draw the snake in a chosen style*/
function snakeDraw(){
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }    
}
/*the function will allow the snake to update to turn to a different direction*/
function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
  
    if(snakeDirection == "down"){/*this code makes the snake turn down*/
        snakeHeadY++;
    }
    else if(snakeDirection == "right"){/*this makes the snake turn rigth*/
       snakeHeadX++;
    }
     
    if(snakeDirection == "up"){/*this makes the snake turn up*/
        snakeHeadY--;
    }
    else if(snakeDirection == "left"){/*this makes the snake turn left*/
        snakeHeadX--;
    }
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*---------------------------------------------------
 * Food Fuction
 * ---------------------------------------------------
 */
/*the function below will creat food at a random spot*/
function foodInitialize(){
    food = {
        x:0,
        y:0
    };
    setFoodPosition();
}
/*this will draw the food at a location were the snake can reach it*/
function foodDraw(){
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}
/*this will create a random spot for a piece of food to be placed*/
function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
/*-------------------------------------------------------
 * Input Functions
 * ------------------------------------------------------
 */
function keyboardHandler(event){
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection !== "left"){
        snakeDirection = "right";
    }
    else if(event.keyCode == "40" && snakeDirection !== "up"){
        snakeDirection = "down";
    }
    
    if(event.keyCode == "37" && snakeDirection !== "right"){
        snakeDirection = "left";
    }
    else if(event.keyCode == "38" && snakeDirection !== "down"){
        snakeDirection = "up";
    }
  
}