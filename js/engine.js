/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
        count= 0;
        misses=0;

//<canvas width="505" height="606" id="canvas"></canvas>
    canvas.width = 505;
    canvas.height = 606;
    ctx.beginPath();
    ctx.moveTo(200,100);
    ctx.lineTo(300,300);
    ctx.closePath();
    doc.body.appendChild(canvas);


    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
         //console.log(count);
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;


//reset();
//console.log(count);
        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.

     */

    function init() {
        reset();
        lastTime = Date.now();
        main();

    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }


    function updateEntities(dt) {
      var i=0;
      var j=0;
        allEnemies.forEach(function(enemy) {
            enemy.update(dt,i,j);
            i=i+0.3;
            j=j+83;
          });
          player.update();
    }
/*This function checks for collisions between the player and bugs. If it happens misses is incremented by 1. It there are more than 3 misses
then the game is reset.
*/
    function checkCollisions() {
      var e1= Math.round(enemy1.x);
      var e2= Math.round(enemy2.x);
      var e3= Math.round(enemy3.x);
      var y1= Math.round(enemy1.y);
      var y2= Math.round(enemy2.y);
      var y3= Math.round(enemy3.y);
      if(((player.x===e1)||(player.x===e2)||(player.x===e3))&&((player.y===y1)||(player.y===y2)||(player.y===y3)))
          {
            player.x= 200;
            player.y=400;
            misses++;
            reset();
          }
    if(player.y<=-15)
    {
      player.x=200;
      player.y=400;
      count++;
      reset();
    }

}

    function render() {

        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col*101, row*83);

            }

        }

        renderEntities();
    }


    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();

    }

/* This function displays the points and misses. It resets the game if misses>3*/

    function reset() {

      document.getElementById('poi').innerText= count;
      document.getElementById('mis').innerText= misses;
      if(misses>3)
      {
        alert("Game Over !!");
        count=0;
        misses=0;
        reset();
      }
      if(count>10)
      {
        alert("Congratulations! You won !!");
        count=0;
        misses=0;
        reset();
      }
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',

    ]);

    Resources.onReady(init);



    global.ctx = ctx;


})(this);
