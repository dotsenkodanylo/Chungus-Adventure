import Keyboard from "./KeystrokeState";

export function setupKeyboard(entity) {

    const input = new Keyboard();
    input.addMapping(38, keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping(37, keyState => {
        entity.go.direction = -keyState;
    });

    input.addMapping(39, keyState => {
        entity.go.direction = keyState;
    });

    return input;
}