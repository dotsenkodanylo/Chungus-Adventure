/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox";
import background from './assets/blank-tiles.png';
import {loadLevel} from "./loaders";
import json from "./1-1.json";
console.log(json);im

const
    css = require('./css/main.css'),
    canvas = <HTMLCanvasElement>document.getElementById("game-screen"),
    context = canvas.getContext('2d');

(function run() {
    if (context) {

        let base = new Image();
        base.src = background;

        base.onload = () => {
            const sprites = new SpriteBox(base, 50, 50);

            // Select sprites in spriteSheet.png file by size increments (50 * x|y), where x|y is the n-th (0-index) sprite.
            sprites.define('bedrock', 0, 0);
            sprites.define('ground', 1, 0);
            sprites.define('soil', 2, 0);
            sprites.define('sky', 3, 0);

            loadLevel("1-1")
                .then(r => {
                    console.log(r);
                });


            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 10; y++) {
                    // Draw function last 2 parameters are x/y coordinates within the canvas.
                    sprites.drawTile('sky', context, x, y);
                }
                sprites.drawTile('ground', context, x, 8);
                sprites.drawTile('bedrock', context, x, 9);
            }
        }
    }
})();
