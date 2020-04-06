/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */

import background from './assets/blank-tiles.png';

const
    css = require('./css/main.css'),
    canvas = <HTMLCanvasElement>document.getElementById("game-screen"),
    context = canvas.getContext('2d');

(function run() {
    if (context) {

        let base = new Image();
        base.src = background;

        console.log(base);
        context.drawImage(base,
            0, 0,
            100, 100);
    }
})();