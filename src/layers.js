export function createBackgroundLayer(level, sprites) {
    const
        buffer = document.createElement('canvas'),
        context = buffer.getContext('2d');

    buffer.width = 800;
    buffer.height = 500;

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        })
    }
}