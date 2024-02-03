import { SCENES } from "../constants/sceneKeys";
import MainMenuUIHandler from "../handlers/UI/MainMenuUIHandler";
import InputHandler from "../handlers/InputHandler";
export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super({ key: SCENES.MAIN_MENU, active: false, visible: false });
    }

    create() {
        this.UI = new MainMenuUIHandler(this);
        this.inputHandler = new InputHandler(this);
    }
}
