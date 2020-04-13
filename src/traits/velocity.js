import {Trait} from "../Entity";

export class Velocity extends Trait {
    constructor() {
        super('traitVelocity');
    }

    update(entity, deltaTime) {
        entity.position.x += entity.velocity.x * deltaTime;
        entity.position.y += entity.velocity.y * deltaTime;
    }
}