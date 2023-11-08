import { MOVEMENT_ACTIONS } from "../constants/movements";
import { UI_EVENTS } from "../constants/events";

export default class InputHandler {
    constructor(scene) {
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.controlledPlane;

        this.scene.events.on(UI_EVENTS.MOVE_BUTTON_CLICK, this.handleMoveButton.bind(this));
    }

    handleMoveButton(action) {
        this.controlledPlane.move(action);
    }
    
    // Moves camera based on cursor pressed
    handleCursorKeys() {
        if (this.cursors.left.isDown) {
            this.scene.cameras.main.scrollX -= 16;
        } else if (this.cursors.right.isDown) {
            this.scene.cameras.main.scrollX += 16;
        } if (this.cursors.up.isDown) {
            this.scene.cameras.main.scrollY -= 16;
        } else if (this.cursors.down.isDown) {
            this.scene.cameras.main.scrollY += 16;
        }
    }

    setControlledPlane(plane) {
        this.controlledPlane = plane;
    }
}