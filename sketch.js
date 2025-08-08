let stickers = []; // array for bouncing stickers
let glamEmojis = []; // array for floating glam emojis
let button; // glam button
let images = []; // loaded images
let stickerOrder = []; // shuffled order, each image twice
let nextIndex = 0; // track sticker index
let surpriseImg; // animated gif for the end

function preload() {
  // load subject images
  for (let i = 0; i < 16; i++) {
    let filename = `Photos/subject${i + 1}.png`;
    images[i] = loadImage(filename);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noCursor(); // hide default cursor

  // fill sticker order (each image twice)
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 16; j++) {
      stickerOrder.push(j);
    }
  }
  shuffle(stickerOrder, true);

  // create surprise gif in center
  surpriseImg = createImg('Photos/surprise1.gif');
  surpriseImg.position(width / 2, height / 2);
  surpriseImg.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2);
  surpriseImg.style('transform', 'translate(-50%, -50%)');
  surpriseImg.hide();

  // glam button
  button = createButton("Add a Drag Sticker 💄✨");
  button.position(20, 20);
  button.style('position', 'fixed');
  button.style('font-size', '28px');
  button.style('font-weight', 'bold');
  button.style('color', '#ffffff');
  button.style('background', 'linear-gradient(45deg, hotpink, deeppink, violet)');
  button.style('border', 'none');
  button.style('border-radius', '50px');
  button.style('padding', '15px 30px');
  button.style('box-shadow', '0 4px 15px rgba(0,0,0,0.3)');
  // button.style('cursor', 'pointer');
  button.style('transition', 'transform 0.2s ease');
  button.mouseOver(() => {
    button.style('transform', 'scale(1.1)');
  });
  button.mouseOut(() => {
    button.style('transform', 'scale(1)');
  });
  button.mousePressed(addSticker);
}

function draw() {
  background(255);

  // update and display stickers
  for (let s of stickers) {
    s.move();
    s.display();
  }

  // update and display glam emojis
  for (let g of glamEmojis) {
    g.move();
    g.display();
  }

  // draw kiss emoji as custom cursor
  textSize(60); // adjust cursor size
  textAlign(CENTER, CENTER);
  text("💋", mouseX, mouseY);
}

function addSticker() {
  if (nextIndex < stickerOrder.length) {
    // add sticker
    let imgIndex = stickerOrder[nextIndex];
    stickers.push(new ImageSticker(random(width), random(height), images[imgIndex]));

    // add 2-3 floating glam emojis for fun
    let emojis = ["💄", "🤡", "✨", "👑", "🌈", "💃", "🤖","🫦"];
    let count = int(random(2, 4));
    for (let i = 0; i < count; i++) {
      glamEmojis.push(new GlamEmoji(random(emojis), random(width), random(height)));
    }

    nextIndex++;

    // update button label if last sticker is next
    if (nextIndex === stickerOrder.length) {
      button.html("Click to see a Surprise Barbie 💅🎁");
    }

  } else if (nextIndex === stickerOrder.length) {
    // show surprise gif
    surpriseImg.show();
    button.remove();
    nextIndex++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (surpriseImg) {
    surpriseImg.position(width / 2, height / 2);
    surpriseImg.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2);
  }
}

// bouncing sticker class
class ImageSticker {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.img = img;
    this.size = min(windowWidth, windowHeight) / 5;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }
}

// floating glam emoji class
class GlamEmoji {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(24, 48);
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  display() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.char, this.x, this.y);
  }
}
