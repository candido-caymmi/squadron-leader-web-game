import Button from "./Button";
import { MOVEMENT_ACTIONS } from "../constants/movements";
import { UI_EVENTS } from "../constants/events";
import { TURN_HANDLER_EVENTS } from "../constants/events";

export default class UIHandler {
    constructor(scene, turnHandler) {
        this.scene = scene;
        this.turnHandler = turnHandler;
        this.addMoveButtons();
        this.addPlayerNameText();

        this.scene.events.on(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlayerNameText);
    }
    
    addMoveButtons(){
        const buttons = [
            { text: 'HARD BANK (LEFT)', action: MOVEMENT_ACTIONS.HARD_BANK_LEFT },
            { text: 'BANK (LEFT)', action: MOVEMENT_ACTIONS.BANK_LEFT },
            { text: 'MOVE FORWARD', action: MOVEMENT_ACTIONS.MOVE_FORWARD },
            { text: 'BANK (RIGHT)', action: MOVEMENT_ACTIONS.BANK_RIGHT },
            { text: 'HARD BANK (RIGHT)', action: MOVEMENT_ACTIONS.HARD_BANK_RIGHT },
        ];
        const onButtonClick = (action)=> {
            this.scene.events.emit(UI_EVENTS.MOVE_BUTTON_CLICK, action);
        }
        
        buttons.forEach((buttonInfo, index) => {
            new Button(this.scene, 560 + (200 * index), (1080 / 2) + 200, buttonInfo.text, ()=> onButtonClick(buttonInfo.action));
        })
    }

    addPlayerNameText() {
        this.playerNameText = this.scene.add.text(10, 10, '', { fontSize: '24px', fill: '#fff' }).setScrollFactor(0);
        this.updatePlayerNameText();
    }

    updatePlayerNameText() {
        const currentPlayer = this.turnHandler.getCurrentPlayer();
        if (currentPlayer) {
            this.playerNameText.setText(`Current Turn: ${currentPlayer.name}`);
        }
    }
}