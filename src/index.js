/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox.js";
import Compositor from "./Compositor";
import Math from "./math";
import Keyboard from "./KeystrokeState";
import {createBackgroundLayer} from "./layers";
import {loadLevel} from "./loaders";
import {createChungus} from "./entities";

const
    css = require('./css/main.css'),
    canvas = document.getElementById("game-screen"),
    context = canvas.getContext('2d');


Promise.all([
    loadLevel('asdf'),
    createChungus()
])
    .then(([level, chungus]) => {
            const
                gravity = 1500,
                timer = new Math(1 / 60);


            const SPACE = 32;
            const input = new Keyboard();

            chungus.position.set(60, 260);
            chungus.velocity.set(100, -400);

            level.entities.add(chungus);

            input.addMapping(SPACE, keyState => {
                if (keyState) {
                    chungus.jump.start();
                } else {
                    chungus.jump.cancel();
                }
            });

            input.listenTo(window);

            timer.update = function update(deltaTime) {
                level.comp.drawLayer(context);
                level.update(deltaTime);
                chungus.velocity.y += gravity * deltaTime;
            };

            timer.start();
        }
    );