import {Trait} from "../Entity";

export class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.speed = 15000;
    }

    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.direction * deltaTime;
    }
}