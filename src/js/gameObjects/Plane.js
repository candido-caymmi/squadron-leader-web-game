import { MOVEMENT_ACTIONS, MOVEMENT_COSTS } from "../constants/movements";

export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);

        //TODO: add attributes
        this.remainingActions = 4; // Change to manouvres?
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

        this.followPath(path, animationTime);

        this.spendActions(action);

        console.log("Actions Left: ", this.remainingActions);

        if(!this.hasRemainingActions) {
            console.log("Out of actions");
        }
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
            ease: 'cubic',
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

    followPath(path, animationTime) {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xffffff, 0.5);

        this.setPath(path);
        path.draw(graphics, 128);

        this.startFollow({
            duration: animationTime,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                graphics.destroy();
                path.destroy();
            }
        })
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

    // moveHardBankLeft() {
    //     this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 0, targetAngle: -90, clockwise: true })
    // }
    // moveBankLeft() {
    //     this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 0, targetAngle: -60, clockwise: true })
    // }
    // moveForward() {
    //     this.move('forward', { distance: 180, animationTime: 300 });
    // }
    // moveBankRight() {
    //     this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 180, targetAngle: 60, clockwise: false })
    // }
    // moveHardBankRight() {
    //     this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 180, targetAngle: 90, clockwise: false })
    // }

    // Generic plane movement function 
    // move(type, params) {
    //     // Verify if plane is already following a path
    //     if (this.isFollowing())
    //         return;

    //     const path = new Phaser.Curves.Path(this.x, this.y);
    //     const graphics = this.scene.add.graphics();

    //     let angleAdjust;
    //     let animationTime;

    //     switch (type) {
    //         case 'forward':
    //             angleAdjust = params.angleAdjust || 90;
    //             animationTime = params.animationTime || 0;

    //             const distance = params.distance || 0;
    //             const endX = this.x + distance * Math.cos(Phaser.Math.DegToRad(this.angle - angleAdjust));
    //             const endY = this.y + distance * Math.sin(Phaser.Math.DegToRad(this.angle - angleAdjust));

    //             path.lineTo(endX, endY);
    //             break;

    //         case 'bank':
    //             angleAdjust = params.angleAdjust || 0;
    //             animationTime = params.animationTime || 600;

    //             const radius = params.radius || 100;
    //             const targetAngle = params.targetAngle || -90;
    //             const startAngle = this.angle + angleAdjust;
    //             const endAngle = startAngle + targetAngle;
    //             const clockwise = params.clockwise || false;

    //             path.ellipseTo(radius, radius, startAngle, endAngle, clockwise, 0)

    //             // Add rotation animation
    //             this.scene.tweens.add({
    //                 targets: this,
    //                 angle: endAngle - angleAdjust,
    //                 duration: animationTime,
    //                 ease: 'cubic',
    //                 repeat: 0,
    //                 yoyo: false
    //             });
    //             break;

    //         default:
    //             break;
    //     }

    //     // Path graphics settings
    //     graphics.lineStyle(3, 0xffffff, 0.5);
    //     this.setPath(path);
    //     path.draw(graphics, 128);

    //     this.startFollow({
    //         duration: animationTime,
    //         yoyo: false,
    //         repeat: 0,
    //         onComplete: () => {
    //             path.destroy();
    //             graphics.destroy();
    //             console.log('x: ' + this.x);
    //         }
    //     })
    // }

    // moveHardBankLeft() {
    //     this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 0, targetAngle: -90, clockwise: true })
    // }
    // moveBankLeft() {
    //     this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 0, targetAngle: -60, clockwise: true })
    // }
    // moveForward() {
    //     this.move('forward', { distance: 180, animationTime: 300 });
    // }
    // moveBankRight() {
    //     this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 180, targetAngle: 60, clockwise: false })
    // }
    // moveHardBankRight() {
    //     this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 180, targetAngle: 90, clockwise: false })
    // }

}


