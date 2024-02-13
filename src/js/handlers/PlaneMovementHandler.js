import { MOVEMENT_ACTIONS, MOVEMENT_COSTS } from "../constants/movements";
import { PLANE_EVENTS } from "../constants/events";

export default class PlaneMovementHandler {
    constructor(scene, plane) {
        this.scene = scene;
        this.plane = plane;
        this.path = null;
        // TODO: Maybe change based on action
        this.animationTime = 400;
    }

    move(action) {
        switch (action) {
            case MOVEMENT_ACTIONS.HARD_BANK_LEFT:
                this.path = this.makeCurvedPath(100, 0, -90, true);
                break;
            case MOVEMENT_ACTIONS.BANK_LEFT:
                this.path = this.makeCurvedPath(160, 0, -60, true);
                break;
            case MOVEMENT_ACTIONS.MOVE_FORWARD:
                this.path = this.makeStraightPath(180);
                break;
            case MOVEMENT_ACTIONS.BANK_RIGHT:
                this.path = this.makeCurvedPath(160, 180, 60, false);
                break;
            case MOVEMENT_ACTIONS.HARD_BANK_RIGHT:
                this.path = this.makeCurvedPath(100, 180, 90, false);
                break;
            default:
                break;
        }

        this.followPath();
    }

    makeCurvedPath(radius, angleAdjust, targetAngle, clockwise) {
        const path = new Phaser.Curves.Path(this.plane.x, this.plane.y);

        const startAngle = this.plane.angle + angleAdjust;
        const endAngle = startAngle + targetAngle;

        path.ellipseTo(radius, radius, startAngle, endAngle, clockwise, 0)

        // Adds appropriate sprite rotation during animation
        this.scene.tweens.add({
            targets: this.plane,
            angle: endAngle - angleAdjust,
            duration: this.animationTime,
            ease: 'Sine.easeInOut',
            repeat: 0,
            yoyo: false
        });

        return path;
    }

    makeStraightPath(distance) {
        const path = new Phaser.Curves.Path(this.plane.x, this.plane.y);

        // Account for sprite's original angle
        const angleAdjust = 90;
        
        const endX = this.plane.x + distance * Math.cos(Phaser.Math.DegToRad(this.plane.angle - angleAdjust));
        const endY = this.plane.y + distance * Math.sin(Phaser.Math.DegToRad(this.plane.angle - angleAdjust));

        path.lineTo(endX, endY);
    
        return path;
    }

    followPath() {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xffffff, 0.5);

        this.plane.setPath(this.path);
        this.path.draw(graphics, 128);

        this.plane.startFollow({
            duration: this.animationTime,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                graphics.destroy();
                this.path.destroy();
                
                if(!this.plane.hasRemainingActions()) {
                    console.log("Out of actions. Switching turn.");
                    this.scene.events.emit(PLANE_EVENTS.OUT_OF_ACTIONS);
                }
            }
        })
    }

}