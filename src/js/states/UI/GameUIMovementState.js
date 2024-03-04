import { MOVEMENT_ACTIONS } from "../../constants/movements";
import { GAME_UI_EVENTS } from "../../constants/events";
import { TURN_HANDLER_EVENTS } from "../../constants/events";
import { PLANE_EVENTS } from "../../constants/events";
import GameUIHandler from "../../handlers/UI/GameUIHandler";
import GameUIAttackState from "./GameUIAttackState";
import SmallButton from "../../../assets/components/SmallButton";
import GameInfoText from "../../../assets/components/GameInfoText";

export default class GameUIMovementState {
    constructor(gameUIHandler) {
        this.gameUIHandler = gameUIHandler;
        this.scene = gameUIHandler.scene;
        this.turnHandler = gameUIHandler.turnHandler;

        // Adds UI elements
        this.addButtons();
        this.addText();

        // Updates player remaining actions on turn change
        this.gameUIHandler.scene.events.on(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlaneRemainingActionsText, this);
        // Updates plane remaining actions text on action expent
        this.gameUIHandler.scene.events.on(PLANE_EVENTS.ACTION_EXPENT, this.updatePlaneRemainingActionsText, this);
    }

    addButtons() { this.addMovementControlButtons(); }

    addText() { this.addPlaneRemainingActionsText(); }

    addMovementControlButtons() {
        const buttons = [
            { text: '( 3 ) HARD BANK LEFT', action: MOVEMENT_ACTIONS.HARD_BANK_LEFT },
            { text: '( 2 ) BANK LEFT', action: MOVEMENT_ACTIONS.BANK_LEFT },
            { text: '( 1 ) MOVE FORWARD', action: MOVEMENT_ACTIONS.MOVE_FORWARD },
            { text: '( 2 ) BANK RIGHT', action: MOVEMENT_ACTIONS.BANK_RIGHT },
            { text: '( 3 ) HARD BANK RIGHT', action: MOVEMENT_ACTIONS.HARD_BANK_RIGHT },
        ];

        const screenWidth = this.gameUIHandler.scene.game.config.width;
        const screenHeight = this.gameUIHandler.scene.game.config.height;

        const onButtonClick = (action) => {
            this.scene.events.emit(GAME_UI_EVENTS.MOVE_BUTTON_CLICK, action);
        }

        this.buttonContainer = this.scene.add.container(screenWidth * 0.1, screenHeight * 0.85 - 60);
        buttons.forEach((buttonInfo, i) => {
            const button = this.scene.add.dom(0, -(i * 60), SmallButton(buttonInfo.text))
                .addListener('click').on('click', () => onButtonClick(buttonInfo.action))
                .setScrollFactor(0);
            this.buttonContainer.add(button);
        });
    }

    // Update text methods 
    addPlaneRemainingActionsText() {
        this.planeRemainingActionsText = this.scene.add.dom(
            this.scene.game.config.width * 0.1,
            this.scene.game.config.height * 0.12 + 40,
            GameInfoText('Current Turn: ', 'playerRemainingActionsText')
        ).setScrollFactor(0)
    }

    updatePlaneRemainingActionsText() {
        const currentPlayer = this.turnHandler.getCurrentPlayer();
        const plane = currentPlayer.getPlane();
        document.getElementById('playerRemainingActionsText').textContent = `Remaining Actions: ${plane.getRemainingActions()}`;
    }

    removeUIElements () {
        this.planeRemainingActionsText.destroy();
    }

    switchStates() {
        // Remove the event listeners of the previous state
        this.gameUIHandler.scene.events.off(PLANE_EVENTS.ACTION_EXPENT, this.updatePlaneRemainingActionsText, this)
        this.gameUIHandler.scene.events.off(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlaneRemainingActionsText, this)

        // Remove UI elements from previous state
        this.planeRemainingActionsText.destroy();
        this.buttonContainer.destroy();

        this.gameUIHandler.state = new GameUIAttackState(this.gameUIHandler);
    }
}