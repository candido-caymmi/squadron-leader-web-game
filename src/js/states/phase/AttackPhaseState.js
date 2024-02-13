import TurnHandler from "../../handlers/TurnHandler";
import MovementPhaseState from "./MovementPhaseState";
import { TURN_HANDLER_EVENTS } from "../../constants/events";

export default class AttackPhaseState {
    constructor(turnHandler) {
        this.turnHandler = turnHandler;
        console.log("ATTACK PHASE!");
    }

    handleTurnSwitch(plane) {
        console.log("Current plane entering attack mode.");
        plane.showAttackRange();
    }

    switchPhases(players) {
        this.turnHandler.state = new MovementPhaseState(this.turnHandler);
        // TODO: this should probably be done on entering MovementPhaseState
        players.forEach((player) => player.getPlane().hideAttackRange());
    }
}