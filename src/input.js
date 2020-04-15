import Keyboard from "./KeystrokeState";

export function setupKeyboard(entity) {

    const input = new Keyboard();
    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.direction = -keyState;
    });

    input.addMapping('ArrowRight', keyState => {
        entity.go.direction = keyState;
    });

    return input;
}