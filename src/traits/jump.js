import {Trait} from "../Entity";

export class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.2;
        this.velocity = 500;
        this.engageTime = 0;
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}