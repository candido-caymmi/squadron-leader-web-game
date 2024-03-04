import Plane from "../../gameObjects/Plane";
import { MOVEMENT_COSTS } from "../../constants/movements";
import { PLANE_EVENTS } from "../../constants/events";
// import MovementPhaseState from "./MovementPhaseState";
// import { TURN_HANDLER_EVENTS } from "../../constants/events";

export default class PlaneMovementState {
    constructor(plane) {
        this.plane = plane;
    }

    control(action) {
        if (this.plane.isFollowing())
            return;
        if (!this.isActionCostValid(action))
            return;

        this.plane.planeMovementHandler.move(action);
        this.plane.spendActions(action);
        this.plane.scene.events.emit(PLANE_EVENTS.ACTION_EXPENT);

        console.log("Actions Left: ", this.plane.remainingActions);
    }

    isActionCostValid(action) { 
        return this.plane.remainingActions - MOVEMENT_COSTS[action] >= 0; 
    }
}