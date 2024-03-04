import { MOVEMENT_ACTIONS } from "../../constants/movements";
import { GAME_UI_EVENTS } from "../../constants/events";
import { TURN_HANDLER_EVENTS } from "../../constants/events";
import { PLANE_EVENTS } from "../../constants/events";
import Button from "../../../assets/components/Button";
import SmallButton from "../../../assets/components/SmallButton";
import GameInfoText from "../../../assets/components/GameInfoText";
import GameUIMovementState from "../../states/UI/GameUIMovementState";

export default class GameUIHandler {
    constructor(scene, turnHandler) {
        this.scene = scene;
        this.turnHandler = turnHandler;

        // Sets initial state
        this.state = new GameUIMovementState(this);

        // Add UI elements
        this.addButtons();
        this.addText();

        // Updates player name text on turn change 
        this.scene.events.on(TURN_HANDLER_EVENTS.TURN_CHANGE, this.updatePlayerNameText, this);
        this.scene.events.on(TURN_HANDLER_EVENTS.PHASE_CHANGE, this.switchStates, this);
    }

    addButtons() { this.addSkipTurnButton(); }
    addText() { this.addPlayerNameText(); }

    // Add text method
    addSkipTurnButton() {
        const onButtonClick = () => { this.scene.events.emit(GAME_UI_EVENTS.SKIP_TURN_BUTTON_CLICK);}

        const screenWidth = this.scene.game.config.width;
        const screenHeight = this.scene.game.config.height;

        this.skipButton = this.scene.add.dom(screenWidth * 0.1, screenHeight * 0.85, SmallButton('SKIP TURN'))
            .addListener('click').on('click', () => onButtonClick())
            .setScrollFactor(0);
    }
    addPlayerNameText() {
        this.playerNameText = this.scene.add.dom(
            this.scene.game.config.width * 0.1,
            this.scene.game.config.height * 0.12,
            GameInfoText('Current Turn: ', 'playerNameText')
        ).setScrollFactor(0)
    }

    // Update text methods
    updatePlayerNameText() {
        const currentPlayer = this.turnHandler.getCurrentPlayer();
        if (currentPlayer)
            document.getElementById('playerNameText').textContent = `Current Turn: ${currentPlayer.getName()}`;
    }

    switchStates() {
        this.state.switchStates();
    }
}