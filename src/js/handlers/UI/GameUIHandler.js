import Button from "../../gameObjects/Button";
import { MOVEMENT_ACTIONS } from "../../constants/movements";
import { GAME_UI_EVENTS } from "../../constants/events";
import { TURN_HANDLER_EVENTS } from "../../constants/events";
import { PLANE_EVENTS } from "../../constants/events";

export default class GameUIHandler {
    constructor(scene, turnHandler) {
        this.scene = scene;
        this.turnHandler = turnHandler;

        this.addMoveButtons();
        this.addPlayerNameText();
        this.addPlaneRemainingActionsText();

        // Updates this.playerNameText on turn change 
        this.scene.events.on(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlayerNameText.bind(this));

        // Updates this.planeRemainingActionsText on turn change
        this.scene.events.on(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlaneRemainingActionsText.bind(this));

         // Updates this.planeRemainingActionsText on action expent
        this.scene.events.on(PLANE_EVENTS.ACTION_EXPENT, this.updatePlaneRemainingActionsText.bind(this));
    }
    
    addMoveButtons(){
        const buttons = [
            { text: '[3] HARD BANK (LEFT)', action: MOVEMENT_ACTIONS.HARD_BANK_LEFT },
            { text: '[2] BANK (LEFT)', action: MOVEMENT_ACTIONS.BANK_LEFT },
            { text: '[1] MOVE FORWARD', action: MOVEMENT_ACTIONS.MOVE_FORWARD },
            { text: '[2] BANK (RIGHT)', action: MOVEMENT_ACTIONS.BANK_RIGHT },
            { text: '[3] HARD BANK (RIGHT)', action: MOVEMENT_ACTIONS.HARD_BANK_RIGHT },
        ];
        const onButtonClick = (action) => {
            this.scene.events.emit(GAME_UI_EVENTS.MOVE_BUTTON_CLICK, action);
        }
        
        buttons.forEach((buttonInfo, index) => {
            new Button(this.scene, 560 + (200 * index), (1080 / 2) + 200, buttonInfo.text, ()=> onButtonClick(buttonInfo.action));
        })
    }

    // Add text methods
    addPlayerNameText() {
        this.playerNameText = this.scene.add.text(40, 110, '', { fontSize: '24px', fill: '#fff' }).setScrollFactor(0);
    }

    addPlaneRemainingActionsText() {
        this.planeRemainingActionsText = this.scene.add.text(40, 150, '', { fontSize: '24px', fill: '#fff' }).setScrollFactor(0);
    }

    // Update text methods
    updatePlayerNameText() {
        const currentPlayer = this.turnHandler.getCurrentPlayer();
        if (currentPlayer) {
            this.playerNameText.setText(`Current Turn: ${currentPlayer.getName()}`);
        }
    }

    updatePlaneRemainingActionsText() {
        const currentPlayer = this.turnHandler.getCurrentPlayer();
        const plane = currentPlayer.getPlane();
        if (currentPlayer) {
            this.planeRemainingActionsText.setText(`Remaining Actions: ${plane.getRemainingActions()}`);
        }
    }
}