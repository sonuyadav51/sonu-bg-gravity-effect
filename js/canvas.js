//Initiaing canvas

const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

// Settng width and height
canvas.width = innerWidth;
canvas.height = innerHeight;
// Creating mouse posiston
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}
//Variables
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
let gravity = 1;
let friction = 0.89;

// Utility Funtion
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY

})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init();

})
addEventListener('click',()=>{
  init();

})

// Objects
class BallGravity {
  constructor(x, y,dx,dy, radius,color) {
    this.x = x
    this.dx = dx
    this.y = y
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction;
    }else{
      this.dy += gravity;

    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius  <= 0){
       this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();


  }
}

// Implementation or Creating Single Shpapes
// let ball;

// function init() {
//   ball = new BallGravity(canvas.width/2,canvas.height/2,2,2,30,"#ff9933");


// }

// // Animation Loop

// function animate() {
//   requestAnimationFrame(animate)
//   c.clearRect(0, 0, canvas.width, canvas.height)

//     ball.update()


// }

// init()
// animate()
// function getSingle(init){
//   init();
// }



function getMultiple(number){
//Implementation or Creating Multiple Shape Shpapes
let ballArray;

function init() {
  ballArray = [];
  for(let i =0; i<number;i++){
    let radius;
if(number == 1){
   radius = 30;
}else{
   radius = randomIntFromRange(8,20);
}

  let x = randomIntFromRange(radius,canvas.width - radius);
  let y = randomIntFromRange(0,canvas.height - radius);
  let dx = randomIntFromRange(-2,2);
  let dy = randomIntFromRange(-2,2);
  let color = randomColor(colors);
    ballArray.push(new BallGravity(x,y,dx,dy,radius,color));
  }


}

// Animation Loop

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

    ballArray.forEach((ball)=>{
       ball.update();
    });


}
init()
animate()
}
//Implementation or Creating Multiple Shape Shpapes
let ballArray;

function init() {
  ballArray = [];
  for(let i =0; i<500;i++){

  let radius = randomIntFromRange(8,20);
  let x = randomIntFromRange(radius,canvas.width - radius);
  let y = randomIntFromRange(0,canvas.height - radius);
  let dx = randomIntFromRange(-2,2);
  let dy = randomIntFromRange(-2,2);
  let color = randomColor(colors);
    ballArray.push(new BallGravity(x,y,dx,dy,radius,color));
  }


}

// Animation Loop

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

    ballArray.forEach((ball)=>{
       ball.update();
    });


}
init()
animate()

//changing this effect

let single = document.querySelector('.btn-one');
let more = document.querySelector('.btn-many');
let input = document.querySelector('.custom');

single.addEventListener('click', ()=>{
  input.value = ""
  input.style.border = "5px solid #ff9933";
  single.classList.add('active');
  more.classList.remove('active');
  getMultiple(1)
})

more.addEventListener('click', ()=>{
  input.value = "";
  input.style.border = "5px solid #ff9933";
  more.classList.add('active');
  single.classList.remove('active');
 getMultiple(500)
})

input.addEventListener('keyup',()=>{
  single.classList.remove('active');
  more.classList.remove('active');
  input.style.border = "5px solid cornflowerblue";
  let value = input.value;
  getMultiple(value);
})