// Object Class Practice:
// Part 1: Write an object class that makes bouncing balls.

// Part 2: Change the design of the bouncing ball to something else (another shape? A combo of shapes? An image? Words? etc.).

// Part 3: Make an array of 10 objects based on the class you wrote.

// Part 4: Add a button. Program the button so that when you click on it, a new object will be added to the array.



let hearts = []; //  array to hold multiple hearts
let button; // button to add more hearts
let colors; // array of possible heart colors
let img1;


function preload(){
  img1 = loadImage('/Photos/subject1.png');

}

function setup() {
  createCanvas(600, 400);
  noStroke();
  // img1.resize(25,25);
  image(img1, 0,0);

  colors = [color("red"), color("blue"), color("yellow")];

  // make 10 hearts to start
  for (let i = 0; i < 10; i++) {
    hearts.push(new Heart(random(width), random(height)));
  }

  // add a heart when button is clicked
  button = createButton("Add a Heart 💙❤️💛");
  button.position(20, 20);
  button.mousePressed(() => {
    hearts.push(new Heart(random(width), random(height)));
  });
}

function draw() {
  // background("white");

  // animate all hearts
  for (let h of hearts) {
    h.move();
    h.display();
  }
}

//define the heart class
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2); // x movement speed
    this.vy = random(-2, 2); // y movement speed
    this.size = random(20, 40); // heart size
    this.color = random(colors); // pick a color from the palette
  }

  move() {
    // update position
    this.x += this.vx;
    this.y += this.vy;

    // bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  display() {
    fill(this.color);
    this.drawHeart(this.x, this.y, this.size);
  }

  // heart shape using two circles and a triangle
  drawHeart(x, y, s) {
    let r = s / 2;

    // left circle
    ellipse(x - r / 2, y - r / 2, r, r);

    // right circle
    ellipse(x + r / 2, y - r / 2, r, r);

    // triangle tip
    triangle(x - r, y - r / 4, x + r, y - r / 4, x, y + r);
  }
}
