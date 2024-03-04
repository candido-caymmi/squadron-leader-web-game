import { MAIN_MENU_UI_EVENTS } from "../constants/events";
import { GAME_UI_EVENTS } from "../constants/events";

//Listens and handles events from UI handler classes.
export default class InputHandler {
    constructor(scene) {
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.controlledPlane;

        this.scene.events.on(GAME_UI_EVENTS.MOVE_BUTTON_CLICK, this.handlePlaneControlButton.bind(this));
        this.scene.events.on(MAIN_MENU_UI_EVENTS.BUTTON_CLICK, this.handleSceneChangeButton.bind(this));
    }

    handleSceneChangeButton(nextScene) {
        this.scene.scene.start(nextScene);
    }

    handlePlaneControlButton(action) {
        this.controlledPlane.control(action);
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