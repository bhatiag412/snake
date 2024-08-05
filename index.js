const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.getElementById("score");
const resetbtn = document.getElementById("reset");
const cd = document.getElementById("difficult")
const startbtn = document.getElementById("start");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbg = "white";
const snakecolor = "lightgreen";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;
let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodx;
let foody;
let speed = 100;
let score = 0;
let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", changedir);
resetbtn.addEventListener("click", resetgame);
cd.addEventListener('click', changediff)
startbtn.addEventListener("click", start)
function start(){
    gamestart();
    startbtn.disabled=true;
}

function gamestart() {
  running = true;
  scoretext.textContent = score;
  createfood();
  drawfood();
  nexttick();
}
function changediff(event){
cd.textContent="difficult"
speed= 60;

}
function nexttick() {
  if (running) {
    setTimeout(() => {
      clearboard();
      drawfood();
      movesnake();
      drawsnake();
      checkgameover();
      nexttick();
    }, speed);
  } else {
    displaygameover();
  }
}
function clearboard() {
  ctx.fillStyle = boardbg;
  ctx.fillRect(0, 0, gamewidth, gameheight);
}
function createfood() {
  function randomfood(min, max) {
    const randnum =
      Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
    return randnum;
  }
  foodx = randomfood(0, gamewidth - unitsize);
  foody = randomfood(0, gamewidth - unitsize);
}
function drawfood() {
  ctx.fillStyle = foodcolor;
  ctx.fillRect(foodx, foody, unitsize, unitsize);
}
function movesnake() {
  const head = { x: snake[0].x + xvelocity, y: snake[0].y + yvelocity };
  snake.unshift(head);
  if (snake[0].x == foodx && snake[0].y == foody) {
    score++;
    scoretext.textContent = score;
    createfood();
  } else {
    snake.pop();
  }
}
function drawsnake() {
  ctx.fillStyle = snakecolor;
  ctx.strokeStyle = snakeborder;
  snake.forEach((snakepart) => {
    ctx.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
    ctx.strokeRect(snakepart.x, snakepart.y, unitsize, unitsize);
  });
}
function changedir(event) {
  const keypressed = event.keyCode;
  const left = 65;
  const right = 68;
  const up = 87;
  const down = 83;  
  const goingup = yvelocity == -unitsize;
  const goingdown = yvelocity == unitsize;
  const goingright = xvelocity == unitsize;
  const goingleft = xvelocity == -unitsize;
  switch (true) {
    case keypressed == left && !goingright:
      xvelocity = -unitsize;
      yvelocity = 0;
      break;
    case keypressed == up && !goingdown:
      xvelocity = 0;
      yvelocity = -unitsize;
      break;
    case keypressed == down && !goingup:
      xvelocity = 0;
      yvelocity = unitsize;
      break;
    case keypressed == right && !goingleft:
      xvelocity = unitsize;
      yvelocity = 0;
      break;
  }
}
function checkgameover() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gamewidth ||
    snake[0].y >= gameheight ||
    snake[0].y < 0
  ) {
    running = false;

  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
  }
}
}
function displaygameover() {
    ctx.font="50px MV Boli";
    ctx.fillStyle="black"
    ctx.textAlign="center"
    ctx.fillText("GAME OVER!",gamewidth/2, gameheight/2)
    running=false;
}
function resetgame() {
    score=0;
    xvelocity=unitsize;
    yvelocity=0;
    snake = [
        { x: unitsize * 4, y: 0 },
        { x: unitsize * 3, y: 0 },
        { x: unitsize * 2, y: 0 },
        { x: unitsize, y: 0 },
        { x: 0, y: 0 },
      ];
      gamestart();
}
