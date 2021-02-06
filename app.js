const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// resize canvas
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    location.reload();
})

// global variables
let velocity = 1;
let starColor = '#ffffff';
let starArray = [];
let starCount = 400;

// HTML DOM inputs
const velocityInput = document.querySelector('#velocity');
const colorInput = document.querySelector('#color');
const starInput= document.querySelector('#stars');

// mouse object that will hold mouse location
const mouse = {
    x: undefined,
    y: undefined,
};

// function to getMouse and touch location
const getMouseLocation = (e) => {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
};

// function Star constructor
function Star(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 1;

    // draw star function
    this.draw = () => {
        const x = ((this.x - this.centerX) * (canvas.width / this.z)) + this.centerX;
        const y = ((this.y - this.centerY) * (canvas.width / this.z)) + this.centerY;

        // change radius size based on depth
        const radius = this.size * (canvas.width / this.z);

        // create an arc
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    this.update = () => {

        // update center position based on mouse x and y
        mouse.x ? this.centerX = mouse.x : this.centerX = canvas.width / 2;
        mouse.y ? this.centerY = mouse.y : this.centerY = canvas.height / 2;

        // move the star based on velocity
        this.z = this.z - velocity;

        // check if star is out of canvas
        if(this.z < 0 ) {

            // randomize position
            this.z = Math.random() * canvas.width;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        // call draw function
        this.draw();
    }
}

// initialize number of stars and push to starArray
const init = () => {

    // clear array ever call
    starArray = [];

    // loop to the number
    for (let i = 0; i < starCount; i++) {

        // create random star values
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let z = Math.random() * canvas.width;

        // push new Star into array with new values
        starArray.push(new Star(x, y, z))
    }
};

// clear canvas function
const clear = () => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const animate = () => {

    // canvas every frame
    clear();

    // loop thru the array and draw
    for (let i = 0; i < starArray.length; i++) {
        starArray[i].update();
    }

    // recursion of animate function
    requestAnimationFrame(animate);
};

// intialize and animate
init();
animate();

// input event listeners
velocityInput.addEventListener('input', () => {
    velocity = velocityInput.value;
});

colorInput.addEventListener('change', () => {
    starColor = colorInput.value;
});

starInput.addEventListener('input', () => {
    starCount = starInput.value;
    init();
});

// mouse event listeners
canvas.addEventListener('mousedown', () => {
    velocity = 10;
});

canvas.addEventListener('mousemove', (e) => {
    getMouseLocation(e);
});

canvas.addEventListener('mouseup', () => {
    velocity = 1;
});

// touch event listener
canvas.addEventListener('touchstart', () => {
    velocity = 5;
});

canvas.addEventListener('touchmove', (e) => {
    getMouseLocation(e.touches[0]);
});

canvas.addEventListener('touchend', () => {
    velocity = 1;
});

