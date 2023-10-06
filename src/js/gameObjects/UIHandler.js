import Button from "./Button";

export default class UIHandler {
    constructor(scene) {
        this.scene = scene;
        this.addMoveButtons();
    }
    addMoveButtons(){
        this.moveUpButton = new Button(this.scene, 640, 600, 'MOVE UP', ()=>{
            this.scene.events.emit('moveUpButtonClick');
        })
    }
}