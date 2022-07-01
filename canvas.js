


let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined,
};

let colorArray = [
    'rgba(90,220,125,0.6)',
    'rgba(90,220,125,0.3)',
    'rgba(90,220,125,0.1)',
    'rgba(90,220,125,0.4)',
    'rgba(90,50,225,0.3)',
    'rgba(255,220,125,0.1)',
];

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    console.log(mouse);
});

// c.fillRect(x, y, width, height); specify location ans size.
function Pixels(x, y, dx, dy, width, height) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {

        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    };
    
    this.update = function() {
        if (this.x + this.width > innerWidth || 
            this.x < 0) {
            this.dx = -this.dx;
        };
    
        if (this.y + this.height > innerHeight || 
            this.y < 0) {
            this.dy = -this.dy;
        };
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 20 && mouse.x - this.x > -20) {
            if (this.width < 60) {
            this.width += 3; 
            this.height += 3; 
            }
        } else if (this.width > 15 && this.height >15)  { 
            this.width -= 2; 
            this.height -= 2;
        };   
        
        this.draw();
    };
    
};


let pixelsArray = [];

for (let i = 0; i < 50; i++) {
    let x = Math.random() * innerWidth;
let y = Math.random() * innerHeight;
let dx = (Math.random() - 0.5) * 1;
let dy = (Math.random() - 0.5) * 1;
let edge = 15;
let height = 15;
    pixelsArray.push(new Pixels(x, y, dx, dy, edge, height));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pixelsArray.length; i++) {
        pixelsArray[i].update();
    }    
    
};
animate();
