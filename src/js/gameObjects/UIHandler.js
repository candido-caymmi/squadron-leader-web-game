import Button from "./Button";

export default class UIHandler {
    constructor(scene) {
        this.scene = scene;
        this.addMoveButtons();
    }
    
    addMoveButtons(){
        this.moveBankLeftButton = new Button(this.scene, 440, 600, 'MOVE LEFT', ()=>{
            this.scene.events.emit('moveBankLeftButtonClick');
        })
        this.moveForwardButton = new Button(this.scene, 640, 600, 'MOVE FORWARD', ()=>{
            this.scene.events.emit('moveForwardButtonClick');
        })
        this.moveBankRightButton = new Button(this.scene, 840, 600, 'MOVE RIGHT', ()=>{
            this.scene.events.emit('moveBankRightButtonClick');
        })
    }
}