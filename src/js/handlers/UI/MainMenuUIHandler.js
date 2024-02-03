import { MAIN_MENU_UI_EVENTS } from "../../constants/events";
import { SCENES } from "../../constants/sceneKeys";
import Button from "./components/Button";

export default class MainMenuUIHandler {
    constructor(scene) {
        this.scene = scene;
        this.addBackground();
        this.addLogo();
        this.addButtons();
    }

    addBackground() {
        this.scene.add.image(this.scene.game.config.width * .5, this.scene.game.config.height * .5, 'grid');
    }

    addLogo() {
        this.scene.add.image(this.scene.game.config.width * .5, this.scene.game.config.height * .4, 'squadronLeaderLogo')
    }

    addButtons() {
        // NOTE: placeholder 'nextScene' for SETTINGS and CREDITS buttons
        const buttons = [
            { text: 'PLAY', nextScene: SCENES.GAME },
            { text: 'SETTINGS', nextScene: SCENES.GAME }, 
            { text: 'CREDITS', nextScene: SCENES.GAME },  
        ];

        buttons.forEach( (button, i) => {
            this.scene.add.dom(this.scene.game.config.width * .5, this.scene.game.config.height * .65 + (i*60), Button(button.text))
                .addListener('click').on('click',
                    () => this.scene.events.emit(MAIN_MENU_UI_EVENTS.BUTTON_CLICK, button.nextScene))
        })
    }

}