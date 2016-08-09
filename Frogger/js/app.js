// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//a function to create an array of enemy objects
var createEnemies = function() {
    //cycle through the rows
    for (var row = 1; row < 4; row++) {
        //create 3 enemies per row
        for (var i = 1; i < 4; i++) {
            var x = -100;
            var y = row * 83 - 25;
            var speed = Math.floor((Math.random() * 2) + 1);
            allEnemies.push(new Enemy(x, y, speed));
        }
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // console.log("in Enemy.update app.js");
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //figure out which row the enemey is on, and how many are already on the screen
    var enemyRow = (this.y + 25) / 83;
    var enemyRowCount = 0;

    //if enemy position is still on screen move enemy at speed
    if (this.x >= -100 && this.x < 505) {
        //move at speed
        this.x = this.x + (this.speed * (dt * 80));
    }
    //If the enemy is not already on the screen, check to see if there are already two enemies in that row on the screen
    else {
        for (var enemy in allEnemies) {
            if (((allEnemies[enemy].y + 25) / 83 === enemyRow) && allEnemies[enemy].x > -100 && allEnemies[enemy].x < 505) {
                enemyRowCount++;
            }
        }
        //if more already 2 enemies, set enemy at rest off screen
        if (enemyRowCount >= 2) {
            this.x = -100;
            this.speed = 0;
        }//otherwise, start moving enemy at new speed
        else {
            this.x = -100;
            this.speed = Math.floor((Math.random() * 3) + 1);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Array of characters to draw
var charImages = [
    'images/char-boy.png', //Draw in spot 1
    'images/char-cat-girl.png', //Draw in spot 2
    'images/char-horn-girl.png', //Draw in spot 3
    'images/char-pink-girl.png', //Draw in spot 4
    'images/char-princess-girl.png' //Draw in spot 5
];

//class for the selector image
var Selector = function() {
    this.x = 202;
    this.y = 415;
    this.img = 'images/Selector.png';
};

//Draw the selector image
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.img), this.x, this.y);
};

//handle input for selector image
Selector.prototype.handleInput = function(key) {
    switch (key) {
        case "up":
            break;
        case "down":
            var charCol = this.x / 101;
            player.char = charImages[charCol];
            break;
        case "left":
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case "right":
            if (this.x < 404) {
                this.x = this.x + 101;
            }
            break;
        default:
            break;
    }
};

//Score class
var Score = function() {
    this.score = 0;
};

//draw the score on the screen, top left
Score.prototype.render = function() {
    ctx.clearRect(0, 0, 200, 50);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textalign = "left";
    ctx.fillText("Score: " + score.score, 0, 45);
    ctx.strokeStyle = "black";
    ctx.strokeText("Score: " + score.score, 0, 45);
};

//update the score
Score.prototype.update = function() {
    this.score = this.score + 1;
};

//Lives class
var Lives = function() {
    this.count = 3;
    this.img = 'images/Heart.png';
};

//draw the lives on teh screen, represented as hearts
Lives.prototype.render = function() {
    ctx.clearRect(350, 0, 505, 50);
    for (var i = 0; i < this.count; i++) {
        ctx.drawImage(Resources.get(this.img), 350 + (i * 50), 0, 40, 50);
    }
};

//update the amount of lives
Lives.prototype.update = function(count) {
    this.count = this.count + count;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = (505 / 2) - (101 / 2);
    this.y = 400;
    this.char = '';
};

//update the player position based on collision with enemy
Player.prototype.update = function() {
    //Check if the player and enemy are occupying the same space, if so reset player to the start
    var enemyCol;
    var enemyRow;
    var playerCol = this.x / 101;
    var playerRow = Math.floor((this.y + 83) / 83);

    // console.log("PLAYER: " + playerCol, playerRow);
    //if player and enemy occupy same space restart player and subtract life
    for (var enemy in allEnemies) {
        if (allEnemies[enemy].hasOwnProperty('x')) {
            enemyCol = Math.floor((allEnemies[enemy].x + 50) / 101);
            enemyRow = (allEnemies[enemy].y + 25) / 83;
            // console.log("ENEMY: " +enemyCol, enemyRow);
            if ((enemyRow === playerRow) && (enemyCol === playerCol)) {
                this.x = (505 / 2) - (101 / 2);
                this.y = 400;
                lives.update(-1);
            }
        }
    }

    //if player reached top row, reset to start and add to score
    if (playerRow === 0) {
        score.update();
        this.x = (505 / 2) - (101 / 2);
        this.y = 400;
    }
};

//draw the player
Player.prototype.render = function() {
    //Player image width is 101
    ctx.drawImage(Resources.get(this.char), this.x, this.y);
};

//Handle input once a player is chosen
Player.prototype.handleInput = function(key) {
    // console.log("in Player.handleInput app.js");
    // console.log(key);
    switch (key) {
        case "up":
            var newY = this.y - 83;
            if (this.y > 0) {
                this.y = newY;
            }
            break;
        case "down":
            newY = this.y + 83;
            if (this.y < 400) {
                this.y = newY;
            }
            break;
        case "left":
            var newX = this.x - 101;
            if (this.x > 0) {
                this.x = newX;
            }
            break;
        case "right":
            newX = this.x + 101;
            if (this.x < 404) {
                this.x = newX;
            }
            break;
        default:
            break;
    }

};

//reset class
var Reset = function() {

};

//asking player if they want to reset the game, handle input
Reset.prototype.handleInput = function(key) {
    switch (key) {
        case "n":
            player.char = 'GAMEOVER';
            break;
        //reset the score, lives and player if player selects yes
        case "y":
            score.score = 0;
            lives.count = 3;
            player.char = '';
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var enemy1 = new Enemy(50, 100);
var selector = new Selector();
var score = new Score();
var lives = new Lives();
var reset = new Reset();

var allEnemies = [];
createEnemies();

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        78: 'n',
        89: 'y'
    };

    //if the player has lives left, handle input
    if (lives.count > 0 && score.score < 10) {
        //if a player is chosen use input to move player
        if (player.char === '') {
            selector.handleInput(allowedKeys[e.keyCode]);
        }
        //otherwise use input to select player
        else {
            player.handleInput(allowedKeys[e.keyCode]);
        }
    }// otherwise ask if they want another game
    else {
        reset.handleInput(allowedKeys[e.keyCode]);
    }


});