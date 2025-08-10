// My Drag Stickers Project!
// This is my first time making bouncing stickers

// Variables to store stuff
let myStickers = [];
let sparkles = [];
let addButton;
let resetButton;
let speedControl;
let stickerImages = [];
let whichStickerNext = 0;
let surpriseGif;
let surpriseSound;
let howFast = 2;

// Load all my sticker images
function preload() {
  for (let i = 0; i < 22; i++) {
    let imageName = `Photos/subject${i + 1}.png`;
    stickerImages[i] = loadImage(imageName);
  }
}

// Set everything up
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noCursor();

  makeButtons();
  makeSpeedSlider();
  makeSurpriseStuff();
}

// Main drawing loop
function draw() {
  background(255);
  
  // Get speed from slider
  if (speedControl) {
    howFast = speedControl.value();
  }

  // Move and draw sparkles
  for (let i = sparkles.length - 1; i >= 0; i--) {
    moveSparkle(i);
    drawSparkle(i);
    
    // Remove sparkles that faded away
    if (sparkles[i].fade <= 0) {
      sparkles.splice(i, 1);
    }
  }
  
  // Move and draw stickers
  for (let i = 0; i < myStickers.length; i++) {
    moveSticker(i);
    drawSticker(i);
  }

  // Draw kiss cursor
  textSize(60);
  textAlign(CENTER, CENTER);
  text("💋", mouseX, mouseY);
}

// When I click the main button
function addNewStickers() {
  if (whichStickerNext < 22) {
    // Add one sticker
    addOneSticker();
    addSomeSparkles();
    whichStickerNext++;
    
    // Add another sticker if I can
    if (whichStickerNext < 22) {
      addOneSticker();
      addSomeSparkles();
      whichStickerNext++;
    }
    
    // Change button text when done
    if (whichStickerNext >= 22) {
      addButton.html("Click for Surprise! 💅🎁");
    }
  } else {
    // Show the surprise!
    showMySurprise();
  }
}

// Add one sticker to the screen
function addOneSticker() {
  let newSticker = {
    x: random(width),
    y: random(height),
    speedX: random(-howFast, howFast),
    speedY: random(-howFast, howFast),
    image: stickerImages[whichStickerNext],
    size: min(windowWidth, windowHeight) / 5
  };
  myStickers.push(newSticker);
}

// Add sparkly emojis
function addSomeSparkles() {
  let emojiList = ["💄", "💋", "✨", "👑", "🪩", "💎", "👠", "👜", "🎀", "🌟", "🍸", "🍾", "💅", "🫦", "🪽", "🦚", "🧿", "🔥", "🌈", "💃", "💖", "🦄"];
  
  let howMany = int(random(2, 5));
  
  for (let i = 0; i < howMany; i++) {
    let newSparkle = {
      emoji: random(emojiList),
      x: random(width),
      y: random(height),
      speedX: random(-howFast * 0.5, howFast * 0.5),
      speedY: random(-howFast * 0.5, howFast * 0.5),
      size: random(24, 52),
      fade: 255,
      fadeSpeed: random(0.5, 1.5),
      spin: 0,
      spinSpeed: random(-0.05, 0.05)
    };
    sparkles.push(newSparkle);
  }
}

// Move a sticker around
function moveSticker(i) {
  let sticker = myStickers[i];
  
  // Move the sticker
  sticker.x = sticker.x + sticker.speedX;
  sticker.y = sticker.y + sticker.speedY;
  
  // Bounce off walls
  if (sticker.x < 0 || sticker.x > width) {
    sticker.speedX = sticker.speedX * -1;
  }
  if (sticker.y < 0 || sticker.y > height) {
    sticker.speedY = sticker.speedY * -1;
  }
}

// Draw a sticker
function drawSticker(i) {
  let sticker = myStickers[i];
  image(sticker.image, sticker.x, sticker.y, sticker.size, sticker.size);
}

// Move a sparkle
function moveSparkle(i) {
  let sparkle = sparkles[i];
  
  // Move it
  sparkle.x = sparkle.x + sparkle.speedX;
  sparkle.y = sparkle.y + sparkle.speedY;
  sparkle.spin = sparkle.spin + sparkle.spinSpeed;
  
  // Bounce off walls
  if (sparkle.x < 0 || sparkle.x > width) {
    sparkle.speedX = sparkle.speedX * -1;
  }
  if (sparkle.y < 0 || sparkle.y > height) {
    sparkle.speedY = sparkle.speedY * -1;
  }
  
  // Make it fade away
  sparkle.fade = sparkle.fade - sparkle.fadeSpeed;
  if (sparkle.fade < 0) {
    sparkle.fade = 0;
  }
}

// Draw a sparkle
function drawSparkle(i) {
  let sparkle = sparkles[i];
  
  push();
  translate(sparkle.x, sparkle.y);
  rotate(sparkle.spin);
  textSize(sparkle.size);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0, sparkle.fade);
  text(sparkle.emoji, 0, 0);
  pop();
}

// Make my buttons
function makeButtons() {
  addButton = createButton("Add Drag Stickers! 💄✨");
  addButton.position(20, 20);
  styleMyButton(addButton, 'hotpink');
  addButton.mousePressed(addNewStickers);
}

// Make the speed slider
function makeSpeedSlider() {
  speedControl = createSlider(0.5, 5, 2, 0.1);
  speedControl.position(width - 250, 20);
  speedControl.style('width', '200px');
  
  let speedLabel = createP('Speed Control 🏃‍♀️');
  speedLabel.position(width - 250, 0);
  speedLabel.style('color', 'deeppink');
  speedLabel.style('font-weight', 'bold');
  speedLabel.style('margin', '0');
}

// Make reset button
function makeResetButton() {
  resetButton = createButton("Start Over! 🔄");
  resetButton.position(20, 80);
  styleMyButton(resetButton, 'orange');
  resetButton.mousePressed(startOver);
}

// Style my buttons
function styleMyButton(button, color) {
  button.style('font-size', '26px');
  button.style('font-weight', 'bold');
  button.style('color', 'white');
  button.style('background', color);
  button.style('border', 'none');
  button.style('border-radius', '50px');
  button.style('padding', '12px 28px');
  button.style('cursor', 'pointer');
}

// Make surprise elements
function makeSurpriseStuff() {
  surpriseGif = createImg('Photos/surprise1.gif');
  surpriseGif.position(width / 2, height / 2);
  surpriseGif.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2);
  surpriseGif.style('transform', 'translate(-50%, -50%)');
  surpriseGif.style('position', 'fixed');
  surpriseGif.hide();

  surpriseSound = createAudio('Photos/asmrcode.mp3');
  surpriseSound.volume(1.0);
  surpriseSound.hide();
}

// Show the surprise
function showMySurprise() {
  surpriseGif.show();
  surpriseSound.play();
  addButton.remove();
  makeResetButton();
}

// Start everything over
function startOver() {
  myStickers = [];
  sparkles = [];
  whichStickerNext = 0;
  surpriseGif.hide();
  surpriseSound.stop();
  if (resetButton) {
    resetButton.remove();
  }
  makeButtons();
}

// Handle window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (surpriseGif) {
    surpriseGif.position(width / 2, height / 2);
    surpriseGif.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2);
  }
}