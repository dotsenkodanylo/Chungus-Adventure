/**
 * JS file created for loading and parsing required assets.
 * =---=---=
 * Imports and corresponding requirements:
 *      -> json: Importing required JSON for generating sprites based on horizontal/vertical canvas ranges.
 *      -> spriteSheet: Main JPEG file containing all visual sprite(s) content.
 *      -> SpriteBox: Custom class for creating and exporting custom sprites.
 */
import json from "./levels.json";
import Level from "./Level";
import spriteSheet from "./assets/blank-tiles.png";
import SpriteBox from "./SpriteBox";
import {createBackgroundLayer, createSpriteLayer} from "./layers";

function loadJson() {
    return json;
}

// Function to return the corresponding json object. Currently not dynamic as there is only one level; in future if
// multiple JSON files are required for levels, they can be parsed with parameter.
export function loadLevel(name) {

    return Promise.all([
        loadJson(),
        loadBackgroundSprites(),
    ])
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            createTiles(level, levelSpec.backgrounds);

            const
                backgroundLayer = createBackgroundLayer(level, backgroundSprites),
                spriteLayer = createSpriteLayer(level.entities);

            level.comp.layers.push(backgroundLayer);
            level.comp.layers.push(spriteLayer);

            return level;
        })
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach((range) => {

            for (let x = range[0]; x < range[1]; x++) {

                for (let y = range[2]; y < range[3]; y++) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                }
            }
        });
    })
}

// Loading and returning the spriteSheet image.
export function loadSpriteSheetImage() {
    return new Promise(resolve => {
        const base = new Image();

        base.addEventListener('load', () => {
            resolve(base);
        });

        base.src = spriteSheet;
    });
}

// Fetching the spriteSheet image and creating a custom SpriteBox class for the corresponding image, and returning the
// new instance of sprites.
export function loadBackgroundSprites() {
    return loadSpriteSheetImage()
        .then(image => {
            const sprites = new SpriteBox(image, 50, 50);

            sprites.defineTile('bedrock', 0, 0);
            sprites.defineTile('ground', 1, 0);
            sprites.defineTile('soil', 2, 0);
            sprites.defineTile('sky', 3, 0);

            return sprites;
        });
}

export function loadCharacterSprites() {
    return loadSpriteSheetImage()
        .then(image => {
            const sprites = new SpriteBox(image, 50, 50);

            sprites.define('idle', 450, 50, 40, 50);

            return sprites;
        })
}