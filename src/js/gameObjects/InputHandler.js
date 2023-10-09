export default class InputHandler {
    constructor(scene) {
        this.scene = scene; ; 
        this.scene.events.on('moveBankLeftButtonClick', this.handleMoveBankLeftButtonClick, this)
        this.scene.events.on('moveForwardButtonClick', this.handleMoveForwardButtonClick, this)
        this.scene.events.on('moveBankRightButtonClick', this.handleMoveBankRightButtonClick, this)
    }

    handleMoveBankLeftButtonClick() {
        this.controlledPlane.moveBankLeft();
    }
    handleMoveForwardButtonClick() {
        this.controlledPlane.moveForward();
    }
    handleMoveBankRightButtonClick() {
        this.controlledPlane.moveBankRight();
    }
    setControlledPlane(plane) {
        this.controlledPlane = plane;
    }
}