/***
 * 2020-04-03
 * Danylo Dotsenko
 * Chungus Adventure
 * Index.ts (Typescript) entry point for project codebase.
 */
import SpriteBox from "./SpriteBox";
import Compositor from "./Compositor";
import Timer from "./Timer";
import Keyboard from "./KeystrokeState";
import {createBackgroundLayer} from "./layers";
import {loadLevel, loadBackgroundSprites, loadCharacterSprites} from "./loaders";

const
    css = require('./css/main.css'),
    canvas = <HTMLCanvasElement>document.getElementById("game-screen"),
    context = canvas.getContext('2d');

function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    }
}

class Vectors {
    x;
    y;

    constructor(x: number, y: number) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Entity {
    position;
    velocity;
    update;
    draw;

    constructor() {
        this.position = new Vectors(0, 0);
        this.velocity = new Vectors(0, 0);
    }
}

Promise.all([
    loadBackgroundSprites(),
    loadLevel(),
    loadCharacterSprites()
])
    .then(([backgroundSprites, level, chungus]) => {
            const
                backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites),
                comp = new Compositor(),
                gravity = 1800,
                chungusEntity = new Entity(),
                spriteLayer = createSpriteLayer(chungusEntity),
                timer = new Timer(1 / 60);

            const SPACE = 32;
            const input = new Keyboard();
            input.addMapping(SPACE, keyState => {
                if (keyState) {
                    console.log("CHungus jump");
                } else {
                    console.log("Chungus jump cancel");
                }
            });

            input.listenTo(window);

            chungusEntity.position.set(200, 260);
            chungusEntity.velocity.set(20, -400);

            chungusEntity.update = function updateChungus(deltaTime) {
                this.position.x += this.velocity.x * deltaTime;
                this.position.y += this.velocity.y * deltaTime;
            };

            chungusEntity.draw = function drawChungus() {
                chungus.draw('idle', context, this.position.x, this.position.y);
            };

            comp.layers.push(backgroundLayer);
            comp.layers.push(spriteLayer);

            timer.update = function update(deltaTime) {
                chungusEntity.update(deltaTime);
                comp.drawLayer(context);
                chungusEntity.velocity.y += gravity * deltaTime;
            };

            timer.start();
        }
    );