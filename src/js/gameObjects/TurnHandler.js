import InputHandler from "./InputHandler";
import Player from "./Player";
import { TURN_HANDLER_EVENTS } from "../constants/events";

export default class TurnHandler {
    constructor(scene, inputHandler) {
        this.scene = scene;
        this.inputHandler = inputHandler;
        this.players = [];
        this.currentPlayerIndex = 0;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    switchTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.inputHandler.setControlledPlane(this.players[this.currentPlayerIndex].plane);
        
        this.scene.events.emit(TURN_HANDLER_EVENTS.TURN_CHANGE); 
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}