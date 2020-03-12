let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let circlesNumber = 800;
let distance = 50; // between mouse curser and a circle

let mouse = { x: undefined, y: undefined };
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

let colors = ["#007A3D", "#000000", "#CE1126", "#FFFFFF"];

function Circle(x, y, radius, dx, dy) {
    this.radius = radius; // once it's created it doesn't change its value on update();
    this.minRadius = radius;
    this.maxRadius = radius * 10;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color=colors[Math.floor(Math.random() * colors.length)];

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);

        c.strokeStyle = this.color;
        c.fillStyle = this.color;

        c.stroke();
        c.fill();
    };

// updates the values of cirlce position // and size
    this.update = () => {
        // makes circles pounce horizontally
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        // makes circles pounce vertically   
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // changes circles depending on mouse position
        // if it's less than 50 it will grow up
        if ((this.x - mouse.x < distance &&
            this.x - mouse.x > -distance &&
            this.y - mouse.y < distance &&
            this.y - mouse.y > -distance)
            
        &&(this.radius < this.maxRadius)){
            this.radius += 1;

        // otherwise it will shrink
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        // makes circle move left/ right
        this.x += this.dx;
        // makes circle move up/ down
        this.y += this.dy;

        this.draw();
    };
}

// logic 

let circles = [];
function init(){
    circles = [];
    for (let i = 0; i < circlesNumber; i++) {
        let radius = Math.random()*4+1;
        let x = Math.random() * (innerWidth - radius * 2) + radius; // the start is similar to radius so it doesn't get stuck at the left side of screen
        let dx = (Math.random() - 0.5) * 4; // speed of circles horizontally
        let y = Math.random() * (innerHeight - radius * 2) + radius; // the start is similar to radius so it doesn't get stuck at the left side of screen
        let dy = (Math.random() - 0.5) * 4; // speed of circles vertically
        
        circles.push(new Circle(x, y, radius, dx, dy));
    }
}

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    circles.forEach(circle => circle.update());
    requestAnimationFrame(animate);
}

init();
animate();
