/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox";
import background from './assets/blank-tiles.png';
import {loadLevel} from "./loaders";

const
    css = require('./css/main.css'),
    canvas = <HTMLCanvasElement>document.getElementById("game-screen"),
    context = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
    background.ranges.forEach((range) => {
        for (let x = range[0]; x < range[1]; x++) {
            for (let y = range[2]; y < range[3]; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

(function run() {
    if (context) {

        let
            base = new Image(),
            levels = loadLevel('1');

        base.src = background;

        base.onload = () => {
            const sprites = new SpriteBox(base, 50, 50);

            // Select sprites in spriteSheet.png file by size increments (50 * x|y), where x|y is the n-th (0-index) sprite.
            sprites.define('bedrock', 0, 0);
            sprites.define('ground', 1, 0);
            sprites.define('soil', 2, 0);
            sprites.define('sky', 3, 0);

            levels.backgrounds.forEach(background => {
                drawBackground(background, context, sprites);
            })
        }
    }
})();
