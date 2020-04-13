import Entity from "./Entity";
import {loadCharacterSprites} from "./loaders";
import {Velocity} from "./traits/velocity";
import {Jump} from "./traits/jump";

export function createChungus() {
    return loadCharacterSprites()
        .then(sprite => {
            const chungus = new Entity();

            chungus.addTrait(new Velocity());
            chungus.addTrait(new Jump());

            chungus.draw = function drawChungus(context) {
                sprite.draw('idle', context, this.position.x, this.position.y);
            };

            return chungus;
        })
}
