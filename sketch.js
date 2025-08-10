// ========================================
// MY DRAG STICKERS PROJECT! 💄✨
// ========================================
// This is my first time making bouncing stickers
// I learned how to make things move around the screen and bounce off walls!

// ========================================
// VARIABLES - All my important stuff
// ========================================

// Arrays to store my objects
let myStickers = []; // this array holds all my bouncing stickers
let sparkles = []; // this array holds all the sparkly emojis
let stickerImages = []; // array to store all 22 sticker images

// UI Elements (buttons and controls)
let addButton; // the main button to add stickers
let resetButton; // button to start over
let speedControl; // slider to control how fast things move

// Surprise elements
let surpriseGif; // the surprise image that shows at the end
let surpriseSound; // the surprise sound that plays

// Counters and settings
let whichStickerNext = 0; // keeps track of which sticker to add next (starts at 0)
let howFast = 2; // how fast things move (starts at 2)

// ========================================
// SETUP FUNCTIONS - Getting everything ready
// ========================================

// Load all my sticker images BEFORE everything starts
// preload() runs first, before setup()
function preload() {
  // Loop through numbers 1 to 22 to load all images
  for (let i = 0; i < 22; i++) {
    // Make the filename (subject1.png, subject2.png, etc.)
    let imageName = `Photos/subject${i + 1}.png`; // i+1 because i starts at 0 but files start at 1
    // Load the image and put it in my array
    stickerImages[i] = loadImage(imageName);
  }
}

// Set everything up when the program starts
// setup() runs once at the beginning
function setup() {
  createCanvas(windowWidth, windowHeight); // make canvas fill the whole window
  imageMode(CENTER); // when I draw images, use center as reference point
  noCursor(); // hide the normal cursor because I'm making my own

  // Call my functions to set up different parts
  makeButtons(); // create the main button
  makeSpeedSlider(); // create the speed control slider
  makeSurpriseStuff(); // create the surprise elements (but hide them for now)
}

// ========================================
// MAIN GAME LOOP - What happens every frame
// ========================================

// Main drawing loop - this runs over and over again (like 60 times per second!)
function draw() {
  background(255); // paint the background white every frame (255 = white)
  
  // Get the current speed from the slider
  if (speedControl) { // make sure the slider exists first
    howFast = speedControl.value(); // get the value from the slider
  }

  // Handle all the sparkly emojis
  for (let i = 0; i < sparkles.length; i++) {
    moveSparkle(i); // move this sparkle
    drawSparkle(i); // draw this sparkle
  }
  
  // Handle all the bouncing stickers
  for (let i = 0; i < myStickers.length; i++) {
    moveSticker(i); // move this sticker
    drawSticker(i); // draw this sticker
  }

  // Draw my custom cursor (kiss emoji that follows the mouse)
  textSize(60); // make the text big
  textAlign(CENTER, CENTER); // center the text on the mouse position
  text("💋", mouseX, mouseY); // draw kiss emoji at mouse position
}

// ========================================
// ADDING STICKERS - Creating new objects
// ========================================

// This function runs when someone clicks the main button
function addNewStickers() {
  // Check if I still have stickers left to add (22 total)
  if (whichStickerNext < 22) {
    // Add the first sticker
    addOneSticker(); // call my function to add one sticker
    addSomeSparkles(); // add some sparkly emojis too
    whichStickerNext++; // move to the next sticker (add 1 to the counter)
    
    // Add a second sticker if there's still one available
    if (whichStickerNext < 22) { // check again
      addOneSticker(); // add another sticker
      addSomeSparkles(); // add more sparkles
      whichStickerNext++; // move to the next sticker again
    }
    
    // Change the button text when all stickers are added
    if (whichStickerNext >= 22) { // if we've added all 22 stickers
      addButton.html("Click for Surprise! 💅🎁"); // change button text
    }
  } else {
    // All stickers have been added, so show the surprise!
    showMySurprise();
  }
}

// Add one sticker to the screen at a random position
function addOneSticker() {
  // Create a new sticker object with all its properties
  let newSticker = {
    x: random(width), // random x position anywhere on screen
    y: random(height), // random y position anywhere on screen
    speedX: random(-howFast, howFast), // random horizontal speed (can be negative = left)
    speedY: random(-howFast, howFast), // random vertical speed (can be negative = up)
    image: stickerImages[whichStickerNext], // get the next image from my array
    size: min(windowWidth, windowHeight) / 5 // size based on screen size (1/5 of smaller dimension)
  };
  myStickers.push(newSticker); // add this new sticker to my stickers array
}

// Add some sparkly emojis to make things more fun!
function addSomeSparkles() {
  // My list of fun emojis to use as sparkles
  let emojiList = ["💄", "💋", "✨", "👑", "🪩", "💎", "👠", "👜", "🎀", "🌟", "🍸", "🍾", "💅", "🫦", "🪽", "🦚", "🧿", "🔥", "🌈", "💃", "💖", "🦄"];
  
  let howMany = int(random(2, 5)); // randomly pick between 2 and 4 sparkles
  
  // Create each sparkle
  for (let i = 0; i < howMany; i++) {
    // Create a new sparkle object
    let newSparkle = {
      emoji: random(emojiList), // pick a random emoji from my list
      x: random(width), // random x position
      y: random(height), // random y position
      speedX: random(-howFast * 0.5, howFast * 0.5), // slower than stickers (half speed)
      speedY: random(-howFast * 0.5, howFast * 0.5), // slower than stickers (half speed)
      size: random(24, 52), // random size between 24 and 52 pixels
      spin: 0, // current rotation angle (starts at 0)
      spinSpeed: random(-0.05, 0.05) // how fast it spins (negative = backwards)
    };
    sparkles.push(newSparkle); // add this sparkle to my sparkles array
  }
}

// ========================================
// MOVING OBJECTS - Animation logic
// ========================================

// Move a sticker around the screen and make it bounce off walls
function moveSticker(i) {
  let sticker = myStickers[i]; // get the sticker at position i in the array
  
  // Move the sticker by adding its speed to its position
  sticker.x = sticker.x + sticker.speedX; // move horizontally
  sticker.y = sticker.y + sticker.speedY; // move vertically
  
  // Bounce off the left and right walls
  if (sticker.x < 0 || sticker.x > width) {
    sticker.speedX = sticker.speedX * -1; // reverse horizontal direction
  }
  // Bounce off the top and bottom walls
  if (sticker.y < 0 || sticker.y > height) {
    sticker.speedY = sticker.speedY * -1; // reverse vertical direction
  }
}

// Move a sparkle emoji and make it spin
function moveSparkle(i) {
  let sparkle = sparkles[i]; // get the sparkle at position i
  
  // Move the sparkle by its speed
  sparkle.x = sparkle.x + sparkle.speedX; // move horizontally
  sparkle.y = sparkle.y + sparkle.speedY; // move vertically
  sparkle.spin = sparkle.spin + sparkle.spinSpeed; // rotate it
  
  // Bounce off walls (same as stickers)
  if (sparkle.x < 0 || sparkle.x > width) {
    sparkle.speedX = sparkle.speedX * -1; // reverse horizontal direction
  }
  if (sparkle.y < 0 || sparkle.y > height) {
    sparkle.speedY = sparkle.speedY * -1; // reverse vertical direction
  }
}

// ========================================
// DRAWING OBJECTS - Visual display
// ========================================

// Draw a sticker on the screen
function drawSticker(i) {
  let sticker = myStickers[i]; // get the sticker at position i
  // Draw the image at the sticker's position with its size
  image(sticker.image, sticker.x, sticker.y, sticker.size, sticker.size);
}

// Draw a sparkle emoji on the screen
function drawSparkle(i) {
  let sparkle = sparkles[i]; // get the sparkle at position i
  
  push(); // save current drawing settings
  translate(sparkle.x, sparkle.y); // move the drawing origin to sparkle position
  rotate(sparkle.spin); // rotate the drawing
  textSize(sparkle.size); // set the text size
  textAlign(CENTER, CENTER); // center the text
  fill("black"); // set color to black
  text(sparkle.emoji, 0, 0); // draw the emoji at the new origin (0,0)
  pop(); // restore the original drawing settings
}

// ========================================
// USER INTERFACE - Buttons and controls
// ========================================

// Create the main button that adds stickers
function makeButtons() {
  addButton = createButton("Add Drag Stickers! 💄✨"); // create button with text
  addButton.position(20, 20); // put it in top-left corner
  styleMyButton(addButton, 'hotpink'); // make it look pretty
  addButton.mousePressed(addNewStickers); // when clicked, run addNewStickers function
}

// Create the speed control slider
function makeSpeedSlider() {
  // Create slider: min=0.5, max=5, starting value=2, step=0.1
  speedControl = createSlider(0.5, 5, 2, 0.1);
  speedControl.position(width - 250, 20); // put it in top-right area
  speedControl.style('width', '200px'); // make it 200 pixels wide
  
  // Create a label for the slider
  let speedLabel = createP('Speed Control 🏃‍♀️'); // create paragraph with text
  speedLabel.position(width - 250, 0); // position above the slider
  speedLabel.style('color', 'deeppink'); // make text pink
  speedLabel.style('font-weight', 'bold'); // make text bold
  speedLabel.style('margin', '0'); // remove default spacing
}

// Create the reset button (only appears after surprise)
function makeResetButton() {
  resetButton = createButton("Start Over! 🔄"); // create button
  resetButton.position(20, 80); // put it below the main button
  styleMyButton(resetButton, 'orange'); // make it orange
  resetButton.mousePressed(startOver); // when clicked, run startOver function
}

// Make my buttons look pretty with custom styling
function styleMyButton(button, color) {
  button.style('font-size', '26px'); // make text big
  button.style('font-weight', 'bold'); // make text bold
  button.style('color', 'white'); // white text
  button.style('background', color); // set background color (passed as parameter)
  button.style('border', 'none'); // no border
  button.style('border-radius', '50px'); // round corners
  button.style('padding', '12px 28px'); // space inside button
  button.style('cursor', 'pointer'); // show hand cursor when hovering
}

// ========================================
// SURPRISE FEATURE - End game experience
// ========================================

// Create the surprise elements but keep them hidden until the end
function makeSurpriseStuff() {
  // Create the surprise GIF image
  surpriseGif = createImg('Photos/surprise1.gif'); // load the gif file
  surpriseGif.position(width / 2, height / 2); // center it on screen
  // Make it half the size of the smaller screen dimension
  surpriseGif.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2);
  surpriseGif.style('transform', 'translate(-50%, -50%)'); // center it perfectly
  surpriseGif.style('position', 'fixed'); // keep it in place even if page scrolls
  surpriseGif.hide(); // start hidden

  // Create the surprise sound
  surpriseSound = createAudio('Photos/asmrcode.mp3'); // load the audio file
  surpriseSound.volume(1.0); // set volume to maximum
  surpriseSound.hide(); // hide the audio controls
}

// Show the surprise when all stickers have been added!
function showMySurprise() {
  surpriseGif.show(); // make the gif visible
  surpriseSound.play(); // start playing the sound
  addButton.remove(); // remove the main button
  makeResetButton(); // create the reset button
}

// ========================================
// UTILITY FUNCTIONS - Helper functions
// ========================================

// Reset everything back to the beginning
function startOver() {
  myStickers = []; // empty the stickers array
  sparkles = []; // empty the sparkles array
  whichStickerNext = 0; // reset counter back to 0
  surpriseGif.hide(); // hide the surprise gif
  surpriseSound.stop(); // stop the surprise sound
  if (resetButton) { // if reset button exists
    resetButton.remove(); // remove it
  }
  makeButtons(); // create the main button again
}

// Handle when someone resizes the browser window
function windowResized() {S
  resizeCanvas(windowWidth, windowHeight); // make canvas fit new window size
  // Reposition and resize the surprise gif if it exists
  if (surpriseGif) {
    surpriseGif.position(width / 2, height / 2); // recenter it
    surpriseGif.size(min(windowWidth, windowHeight) / 2, min(windowWidth, windowHeight) / 2); // resize it
  }
}
