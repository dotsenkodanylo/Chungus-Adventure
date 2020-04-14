import {Vectors} from "./vectors";

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.log('Unhandled trait call.');
    }
}

export default class Entity {

    constructor() {
        this.position = new Vectors(0, 0);
        this.velocity = new Vectors(0, 0);
        this.size = new Vectors(0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}