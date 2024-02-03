import { MOVEMENT_ACTIONS, MOVEMENT_COSTS } from "../constants/movements";
import { PLANE_EVENTS } from "../constants/events";

export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);

        //TODO: add attributes
        this.baseActions = 4; // Change to manouvres?
        this.remainingActions = this.baseActions;
    }

    move(action) {
        if (this.isFollowing())
            return;

        if(!this.isActionCostValid(action))
            return;

        let path;
        const animationTime = 400;

        switch (action) {
            case MOVEMENT_ACTIONS.HARD_BANK_LEFT:
                path = this.makeCurvedPath(100, 0, -90, true, animationTime);
                break;
            case MOVEMENT_ACTIONS.BANK_LEFT:
                path = this.makeCurvedPath(160, 0, -60, true, animationTime);
                break;
            case MOVEMENT_ACTIONS.MOVE_FORWARD:
                path = this.makeStraightPath(180);
                break;
            case MOVEMENT_ACTIONS.BANK_RIGHT:
                path = this.makeCurvedPath(160, 180, 60, false, animationTime);
                break;
            case MOVEMENT_ACTIONS.HARD_BANK_RIGHT:
                path = this.makeCurvedPath(100, 180, 90, false, animationTime);
                break;
            default:
                break;
        }

        this.spendActions(action);
        this.scene.events.emit(PLANE_EVENTS.ACTION_EXPENT);
        console.log("Actions Left: ", this.remainingActions);

        this.followPath(path, animationTime, ()=> { 
            if(!this.hasRemainingActions()) {
            console.log("Out of actions. Switching turn.");
            this.scene.events.emit(PLANE_EVENTS.OUT_OF_ACTIONS);
        }});
    }

    makeCurvedPath(radius, angleAdjust, targetAngle, clockwise, animationTime) {
        const path = new Phaser.Curves.Path(this.x, this.y);

        const startAngle = this.angle + angleAdjust;
        const endAngle = startAngle + targetAngle;

        path.ellipseTo(radius, radius, startAngle, endAngle, clockwise, 0)

        // Adds appropriate sprite rotation during animation
        this.scene.tweens.add({
            targets: this,
            angle: endAngle - angleAdjust,
            duration: animationTime,
            ease: 'Sine.easeInOut',
            repeat: 0,
            yoyo: false
        });

        return path;
    }

    makeStraightPath(distance) {
        const path = new Phaser.Curves.Path(this.x, this.y);

        // Account for sprite's original angle
        const angleAdjust = 90;
        
        const endX = this.x + distance * Math.cos(Phaser.Math.DegToRad(this.angle - angleAdjust));
        const endY = this.y + distance * Math.sin(Phaser.Math.DegToRad(this.angle - angleAdjust));

        path.lineTo(endX, endY);
    
        return path;
    }

    followPath(path, animationTime, callback) {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xffffff, 0.5);

        this.setPath(path);
        path.draw(graphics, 128);

        this.startFollow({
            duration: animationTime,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                graphics.destroy();
                path.destroy();
                callback();
            }
        })
    }

    restoreActions() {
        this.remainingActions = this.baseActions; 
    }

    spendActions(action) {
        this.remainingActions -= MOVEMENT_COSTS[action];
    }

    isActionCostValid(action) {
        return this.remainingActions - MOVEMENT_COSTS[action] >= 0;
    }

    hasRemainingActions() {
        return this.remainingActions > 0;
    }

    getRemainingActions() {
        return this.remainingActions;
    }
}


