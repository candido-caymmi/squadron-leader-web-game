import { MOVEMENT_ACTIONS, MOVEMENT_COSTS } from "../constants/movements";
import { PLANE_EVENTS } from "../constants/events";
import PlaneMovementHandler from "../handlers/PlaneMovementHandler";

export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);
        this.planeMovementHandler = new PlaneMovementHandler(this.scene, this);
    
        this.attackArcs = [];
        for(let i=0; i<3; i++)
            this.attackArcs.push(this.scene.add.graphics());

        //TODO: add attributes
        this.baseActions = 4; // TODO: Change to manouvres?
        this.remainingActions = this.baseActions;
    }

    move(action) {
        if (this.isFollowing())
            return;

        if (!this.isActionCostValid(action))
            return;

        this.planeMovementHandler.move(action);
        this.spendActions(action);
        this.scene.events.emit(PLANE_EVENTS.ACTION_EXPENT);

        console.log("Actions Left: ", this.remainingActions);
    }

    showAttackRange() {
        let arcAngle = Phaser.Math.DegToRad(43);
        let angleAdjust = Phaser.Math.DegToRad(90);

        this.attackArcs.forEach((arc, i) => {
            arc.fillStyle(0xffff00, 0.2);
            arc.slice(this.x, this.y, 350 - (i*100), this.rotation - arcAngle + (- angleAdjust), this.rotation + arcAngle - angleAdjust, false);
            arc.fillPath();
        })
    }

    hideAttackRange() {
        this.attackArcs.forEach(arc => arc.clear());
    }

    restoreActions() { this.remainingActions = this.baseActions; }

    spendActions(action) { this.remainingActions -= MOVEMENT_COSTS[action]; }

    isActionCostValid(action) { return this.remainingActions - MOVEMENT_COSTS[action] >= 0; }

    hasRemainingActions() { return this.remainingActions > 0; }

    getRemainingActions() { return this.remainingActions; }
}


