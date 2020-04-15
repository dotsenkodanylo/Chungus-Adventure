/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import Math from "./math";
import {loadLevel} from "./loaders";
import {createChungus} from "./entities";
import {setupKeyboard} from "./input";

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
                timer = new Math(1 / 60);

            // Debugging Layer:
            //level.comp.layers.push(createCollisionLayer(level));
            chungus.position.set(0, 250);
            level.entities.add(chungus);

            const input = setupKeyboard(chungus);
            input.listenTo(window);

            // Debugging block
            /*['mousedown', 'mousemove'].forEach(eventName => {
                canvas.addEventListener(eventName, event => {
                    if(event.buttons === 1) {
                        chungus.velocity.set(0, 0);
                        chungus.position.set(event.offsetX, event.offsetY);
                    }
                })
            });*/

            timer.update = function update(deltaTime) {
                level.comp.drawLayer(context);
                level.update(deltaTime);
            };

            timer.start();
        }
    );