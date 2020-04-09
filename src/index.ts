/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox";
import {loadLevel, loadBackgroundSprites} from "./loaders";

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

Promise.all([
    loadBackgroundSprites(),
    loadLevel()
])
    .then(([sprites, level]) => {
            level.backgrounds.forEach(background => {
                drawBackground(background, context, sprites);
            });
        }
    );