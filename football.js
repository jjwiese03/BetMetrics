const canvas = document.getElementById("football");
const ctx = canvas.getContext('2d');

const bottomPart = document.getElementById("bottom-part");

function resizeCanvas() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight - bottomPart.clientHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


const spriteSheet = new Image();
spriteSheet.src = '/pics/Football.png';

const R = Math.min(canvas.width, canvas.height) * 0.1, gravity = 40;

var x = R, y = R, rot = 0, vx = 400, vy = 1400, wrot = 0;

let lastTime = Date.now();
let dt = 0;

function timeEvolution() {
    dt = (Date.now() - lastTime) / 1000

    vy += gravity;
    x += vx * dt;
    y += vy * dt;
    rot += wrot * dt;

    if ((x + R > canvas.width && vx > 0) || (x - R < 0 && vx < 0)) {
        // right || left
        vx *= -0.8
    };

    if (y + R > canvas.height) {
        // bottom
        vy = -Math.max(Math.sqrt(vy ** 2 * 0.8), gravity)
        // drag
        vx *= 0.97;

        // rotation
        wrot = vx / R;
    }
    else if (y - R <= 0 && vy < 0) vy *= -0.6;

    lastTime = Date.now();

    return;
}

let running = true;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.drawImage(spriteSheet, 155, 155, 710, 710, -R, -R, 2 * R, 2 * R);
    ctx.restore();

    if(running) {timeEvolution(); requestAnimationFrame(draw);};
}

spriteSheet.onload = draw

const handleClick = (event) => {
    const X = (event.type.startsWith("touch")) ? event.touches[0].clientX : event.clientX
    const Y = (event.type.startsWith("touch")) ? event.touches[0].clientY : event.clientY

    if (Math.sqrt((X - x)**2 + (Y - y)**2) <= R) {
        const offset = {"x": x - X, "y": y - Y} 

        moveHandler = handleMove(offset);
        document.addEventListener("mousemove", moveHandler)
        document.addEventListener("touchmove", moveHandler)
    }
}

const handleMove = (offset) => (event) => {
    if (event.type.startsWith("touch")) event = event.touches[0];

    running = false;

    const newX = Math.min(canvas.width - R, Math.max(R, event.clientX + offset.x));
    const newY = Math.min(canvas.height - R, Math.max(R, event.clientY + offset.y));

    vx = (newX - x) * 1000 / (Date.now() - lastTime) 
    vy = (newY - y) * 1000 / (Date.now() - lastTime)
    x = newX;
    y = newY;

    draw();

    lastTime = Date.now()
}

let moveHandler;

document.addEventListener("mousedown", handleClick)

document.addEventListener("touchstart", handleClick)


document.addEventListener("mouseup", (event) => {
    document.removeEventListener("mousemove", moveHandler)
    running = true;
    draw();
})

document.addEventListener("touchend", (event) => {
    document.removeEventListener("touchmove", moveHandler)
    running = true;
    draw();
})