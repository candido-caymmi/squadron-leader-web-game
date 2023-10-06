export default class InputHandler {
    constructor(scene) {
        this.scene = scene; ; 
        this.scene.events.on('moveUpButtonClick', this.handleMoveUpButtonClick, this)
    }

    handleMoveUpButtonClick() {
        this.controlledPlane.move();
    }

    setControlledPlane(plane) {
        this.controlledPlane = plane;
    }
}