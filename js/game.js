var player = new Player(7 * tamTile, 8 * tamTile, 3*Math.PI/2);

function init()
{
    console.log('init');

    Key.init();

    ctx.imageSmoothingEnabled = false;

    tiles.src = "res/img/Texturas.png";

    requestAnimationFrame(loop);
}

function loop()
{
    update();
    draw();
    requestAnimationFrame(loop);
}


function update()
{
    Key.update();
    player.update();
}

function draw()
{
    player.draw();
}