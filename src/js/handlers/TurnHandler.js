import InputHandler from "./InputHandler";
import Player from "../gameObjects/Player";
import { TURN_HANDLER_EVENTS, PLANE_EVENTS } from "../constants/events";

export default class TurnHandler {
    constructor(scene, inputHandler) {
        this.scene = scene;
        this.inputHandler = inputHandler;
        this.players = [];
        this.currentPlayerIndex = 0;

        // If any plane is out of actions, switch turns.
        this.scene.events.on(PLANE_EVENTS.OUT_OF_ACTIONS, this.switchTurn.bind(this))
    }

    addPlayer(player) {
        this.players.push(player);
    }

    switchTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.inputHandler.setControlledPlane(this.players[this.currentPlayerIndex].plane);
        this.players[this.currentPlayerIndex].plane.restoreActions();
        this.scene.events.emit(TURN_HANDLER_EVENTS.TURN_CHANGE); 
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}