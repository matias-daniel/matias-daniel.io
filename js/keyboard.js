//KEYBOARD
var Key = {
    keysDown: new Array(Number),
    keysReleased: new Array(Number),
    keysCount: new Array(Boolean),
    init: () => {
        document.onkeydown  = Key.keyDown;
        document.onkeyup    = Key.keyUp;
    },
    keyDown: (key) => {
        let keyCode = key.keyCode;
        if (Key.keysDown.indexOf(keyCode) == -1)
            Key.keysDown.push(keyCode);
    },
    keyUp: (key) => {
        let indexDown = Key.keysDown.indexOf(key.keyCode);
        let indexReleased = Key.keysReleased.indexOf(key.keyCode);

        if (indexDown != -1)
            Key.keysDown.splice(indexDown, 1);

        if (indexReleased == -1) {
            Key.keysReleased.push(key.keyCode);
            Key.keysCount.push(false);
        }
    },
    update: () => {
        for (let i = 0; i < Key.keysReleased.length; i++)
        {
            if (Key.keysCount[i] == true)
            {
                Key.keysReleased.splice(i, 1);
                Key.keysCount.splice(i, 1);
            }
            else
            {
                Key.keysCount[i] = true;
            }
        }
    },
    isDown: (keyCode) => {
        return (Key.keysDown.indexOf(keyCode) != -1) ? true : false;
    },
    isReleased: (keyCode) => {
        return (Key.keysReleased.indexOf(keyCode) != -1) ? true : false;
    }
}

// DEFINE CODE KEYS!
const VK_W      = 87;
const VK_A      = 65;
const VK_S      = 83;
const VK_D      = 68;

const VK_UP     = 38;
const VK_LEFT   = 37;
const VK_DOWN   = 40;
const VK_RIGHT  = 39;

const VK_I      = 73;
const VK_J      = 74;
const VK_K      = 75;
const VK_L      = 76;

const VK_C      = 67;
const VK_F      = 70;
const VK_Q      = 81;

// DEFINE INPUT PLAYER
/*var KEY_UP     = VK_UP;
var KEY_LEFT   = VK_LEFT;
var KEY_DOWN   = VK_DOWN;
var KEY_RIGHT  = VK_RIGHT;*/

// Rotation input
var KEY_ROT_UP     = VK_I;
var KEY_ROT_LEFT   = VK_J;
var KEY_ROT_DOWN   = VK_K;
var KEY_ROT_RIGHT  = VK_L;

// Move input
var KEY_MOV_UP     = VK_W;
var KEY_MOV_LEFT   = VK_A;
var KEY_MOV_DOWN   = VK_S;
var KEY_MOV_RIGHT  = VK_D;