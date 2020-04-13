/**
 * Custom SpriteBox class, used to create sprite objects for a corresponding spriteSheet, based on the width of the
 * individual sprites, which is passed in as a parameter.
 */
export default class SpriteBox {
    image: HTMLImageElement;
    width: number;
    height: number;
    tiles;
    draw;
    drawTile;

    constructor(image, width: number, height: number) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    define(name: string, x: number, y: number, width: number, height: number) {
        const buffer = document.createElement('canvas');

        if (buffer) {
            buffer.width = width;
            buffer.height = height;

            buffer
                .getContext('2d')
                .drawImage(
                    this.image,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );

            this.tiles.set(name, buffer);
        }

        this.draw = function (name, context, x, y) {
            const buffer = this.tiles.get(name);
            context.drawImage(buffer, x, y);
        };

        this.drawTile = function (name, context, x, y) {
            this.draw(name, context, x * this.width, y * this.height);
        };
    }
}
