/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox.js";
import Compositor from "./Compositor";
import Timer from "./Timer";
import Keyboard from "./KeystrokeState";
import {createBackgroundLayer} from "./layers";
import {
    loadLevel,
    loadBackgroundSprites,
    loadCharacterSprites
} from "./loaders";
import {createChungus} from "./entities";

const
    css = require('./css/main.css'),
    canvas = document.getElementById("game-screen"),
    context = canvas.getContext('2d');

function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    }
}

Promise.all([
    loadBackgroundSprites(),
    loadLevel(),
    createChungus()
])
    .then(([backgroundSprites, level, chungus]) => {
            const
                comp = new Compositor(),
                backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites),
                gravity = 1500,
                timer = new Timer(1 / 60),
                spriteLayer = createSpriteLayer(chungus);


            comp.layers.push(backgroundLayer);

            const SPACE = 32;
            const input = new Keyboard();

            input.addMapping(SPACE, keyState => {
                if (keyState) {
                    chungus.jump.start();
                } else {
                    chungus.jump.cancel();
                }
            });

            input.listenTo(window);


            chungus.position.set(60, 260);
            chungus.velocity.set(100, -400);

            comp.layers.push(spriteLayer);

            timer.update = function update(deltaTime) {
                chungus.update(deltaTime);
                comp.drawLayer(context);
                chungus.velocity.y += gravity * deltaTime;
            };

            timer.start();
        }
    );