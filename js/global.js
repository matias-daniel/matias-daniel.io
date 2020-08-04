// CANVAS
var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');

// TILES
var tiles = new Image();

// DATA GAME
const FOV = Math.PI/4; //60° = 1.0472

const tamTile     = 31;
const tamTileShow = 16;

const numRays = 500/2;

// SIZE SCREEN
const screenWidth  = 500;
const screenHeight = 500;

const pixelWidth = screenWidth / numRays;

// SIZE MAP
const mapWidth  = 10;
const mapHeight = 10;

// SHOW MAP
var showMap = false;

// DATA MAP
const map = "0000000000" +
            "0........0" +
            "0........0" +
            "0........0" +
            "0000110000" +
            "0........0" +
            "0........0" +
            "0........0" +
            "0........0" +
            "0000000000";


// COLORS
const COLOR_WALL = '#660022';
const COLOR_BACK = '#FFFFFF';
const COLOR_MAP  = '#330011';
const COLOR_PLAYER = '#00FF00';
const COLOR_BACK_MAP = '#000000';

// NORMALIZAR ANGULOS
function normalizeAngle(angle)
{
    angle = angle % (2 * Math.PI);

    if (angle < 0)
        angle = angle + (2 * Math.PI);

    return angle;
}

// OBTENER LA DISTANCE ENTRE DOS PUNTOS
var getDistancePoint = (x1, y1, x2, y2)  =>
{
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

// ACERCAR VALOR
var approach = (start, end, acc) =>
{
    if (start < end) 
        return Math.min(start + acc, end);
    else
        return Math.max(start - acc, end);
}

// OBTENER ID TILE/TEXTURE
var getIdTile = (x, y, width) =>
{
    if (map[x + y * width] == '.')  return -1;
    else                            return parseInt(map[x + y * width]);
}