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

    define(name: string, x: number, y: number) {
        const buffer = document.createElement('canvas');

        if (buffer) {
            buffer.width = this.width;
            buffer.height = this.height;

            buffer
                .getContext('2d')
                .drawImage(
                    this.image,
                    x * this.width,
                    y * this.height,
                    this.width,
                    this.height,
                    0,
                    0,
                    this.width,
                    this.height
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
