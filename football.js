const canvas = document.getElementById("football")
canvas.width = innerWidth;
canvas.height = innerHeight - document.getElementById("bottom-part").clientHeight
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = '/pics/Football.png';

const R = 70;

var x = 0;
var y = 0;
var vx = 0;
var vy = 0;

var clickOffset = [0, 0];

function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     ctx.drawImage(spriteSheet, x, y, 2 * R, 2 * R)
}
spriteSheet.onload = draw

const handleMouseMove = (offset) => (event) => {
    x = event.clientX + offset.x;
    y = event.clienty + offset.y;

    draw();
}

var moveHandler;
canvas.addEventListener("mousedown", (event) => {
    if (Math.sqrt((event.clientX - x)**2 + (event.clientY - y)**2) <= R) {

        const offset = {"x": x - event.clientX, "y": y - event.clientY} 
        moveHandler = handleMouseMove(offset);
        canvas.addEventListener("mousemove", moveHandler)
    }
})

canvas.addEventListener("click", (event) => {
    canvas.removeEventListener("mousemove", moveHandler)
})