export default class Compositor {

    constructor() {
        this.layers = [];
    }

    drawLayer(context) {
        this.layers.forEach(layer => {
            layer(context);
        })
    }
}