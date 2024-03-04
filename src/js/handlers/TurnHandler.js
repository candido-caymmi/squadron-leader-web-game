import InputHandler from "./InputHandler";
import Player from "../gameObjects/Player";
import { TURN_HANDLER_EVENTS, PLANE_EVENTS, GAME_UI_EVENTS } from "../constants/events";
import MovementPhaseState from "../states/phase/MovementPhaseState";
import AttackPhaseState from "../states/phase/AttackPhaseState";

export default class TurnHandler {
    constructor(scene, inputHandler) {
        this.scene = scene;
        this.inputHandler = inputHandler;
        
        this.players = [];
        this.currentPlayerIndex = 0;

        this.state;
        this.initializePhaseState();

        // If any plane is out of actions, switch turns.
        this.scene.events.on(PLANE_EVENTS.OUT_OF_ACTIONS, this.switchTurn, this)
        this.scene.events.on(GAME_UI_EVENTS.SKIP_TURN_BUTTON_CLICK, this.switchTurn, this)
    }

    initializePhaseState() { this.state = new MovementPhaseState(this) }

    switchTurn() {
        // If current player is the last on the list while switching turns, switch phases
        if(this.currentPlayerIndex == this.players.length - 1)
            this.switchPhases();
    
        this.updateTurnOrder();

        this.state.handleTurnSwitch(this.players[this.currentPlayerIndex].plane);

        // Restores all action points (NOTE: Currently only relevant to the MovementPhaseState, update this later)
        this.players[this.currentPlayerIndex].plane.restoreActions();

        this.scene.events.emit(TURN_HANDLER_EVENTS.TURN_CHANGE);
    }

    switchPhases() {
        this.state.switchPhases(this.players);
        this.scene.events.emit(TURN_HANDLER_EVENTS.PHASE_CHANGE);
    }

    // Updates player turn order/controlled plane
    updateTurnOrder() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.inputHandler.setControlledPlane(this.players[this.currentPlayerIndex].plane);
    }

    addPlayer(player) { this.players.push(player); }

    getCurrentPlayer() { return this.players[this.currentPlayerIndex]; }

    getState() { return this.state; }
}