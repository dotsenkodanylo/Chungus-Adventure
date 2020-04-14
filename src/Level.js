import Compositor from "./Compositor";
import {Matrix} from "./vectors";
import TileCollider from "./TileCollider";

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);
            entity.position.y += entity.velocity.y * deltaTime;
            this.tileCollider.checkY(entity);

        })
    }
}