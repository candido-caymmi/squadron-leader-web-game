import TurnHandler from "../../handlers/TurnHandler";
import AttackPhaseState from "./AttackPhaseState";
import { TURN_HANDLER_EVENTS } from "../../constants/events";

export default class MovementPhaseState {
    constructor(turnHandler) {
        this.turnHandler = turnHandler;
        console.log("MOVEMENT PHASE!");
    }

    handleTurnSwitch(plane) {
        console.log("Current plane entering movement mode.");
    }

    switchPhases() {
        this.turnHandler.state = new AttackPhaseState(this.turnHandler);
    }
}