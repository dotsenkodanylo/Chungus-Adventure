function drawBackground(background, context, sprites) {
    background.ranges.forEach((range) => {

        for (let x = range[0]; x < range[1]; x++) {

            for (let y = range[2]; y < range[3]; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');

    buffer.width = 800;
    buffer.height = 500;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}
