export default class Compositor {
    layers;

    constructor() {
        this.layers = [];
    }

    drawLayer(context) {
        this.layers.forEach(layer => {
            layer(context);
        })
    }
}