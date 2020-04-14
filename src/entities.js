import Entity from "./Entity";
import {loadCharacterSprites} from "./loaders";
import {Velocity} from "./traits/velocity";
import {Jump} from "./traits/jump";
import {Go} from "./traits/go";

export function createChungus() {
    return loadCharacterSprites()
        .then(sprite => {
            const chungus = new Entity();

            chungus.size.set(40, 45);
            chungus.addTrait(new Go());
            chungus.addTrait(new Jump());
            //chungus.addTrait(new Velocity());

            chungus.draw = function drawChungus(context) {
                sprite.draw('idle', context, this.position.x, this.position.y);
            };

            return chungus;
        })
}
