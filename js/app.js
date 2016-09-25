var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 68;
    this.i = 10;

};


Enemy.prototype.update = function(dt, i, j) {

    this.x = (this.x + Math.random() + i);
    this.y = (68 + j);

    if (this.x > 510) {
        this.x = 0;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.boy = 'images/char-boy.png';
    this.i = 0;
    this.j = 0;
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    this.x = this.x + (this.i);
    this.y = this.y + (this.j);
    if ((this.x > 430) || (this.x < 20)) {
        this.x = this.x - this.i;
    }
    if ((this.y > 400) || (this.y < -15)) {
        this.y = this.y - this.j;
    }
    this.i = 0;
    this.j = 0;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.i = (-83);
            player.update();
            break;
        case 'right':
            this.i = 83;
            player.update();
            break;
        case 'up':
            this.j = (-83);
            player.update();
            break;
        case 'down':
            this.j = 83;
            player.update();
            break;
    }
};


var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});
