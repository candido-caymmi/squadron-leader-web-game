export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);
    }

    // Generic plane movement function 
    move(type, params) {
        // Verify if plane is already following a path
        if (this.isFollowing())
            return;

        const path = new Phaser.Curves.Path(this.x, this.y);
        const graphics = this.scene.add.graphics();

        let angleAdjust;
        let animationTime;

        switch (type) {
            case 'forward':
                angleAdjust = params.angleAdjust || 90;
                animationTime = params.animationTime || 0;

                const distance = params.distance || 0;
                const endX = this.x + distance * Math.cos(Phaser.Math.DegToRad(this.angle - angleAdjust));
                const endY = this.y + distance * Math.sin(Phaser.Math.DegToRad(this.angle - angleAdjust));

                path.lineTo(endX, endY);
                break;

            case 'bank':
                angleAdjust = params.angleAdjust || 0;
                animationTime = params.animationTime || 600;

                const radius = params.radius || 100;
                const targetAngle = params.targetAngle || -90;
                const startAngle = this.angle + angleAdjust;
                const endAngle = startAngle + targetAngle;
                const clockwise = params.clockwise || false;

                path.ellipseTo(radius, radius, startAngle, endAngle, clockwise, 0)

                // Add rotation animation
                this.scene.tweens.add({
                    targets: this,
                    angle: endAngle - angleAdjust,
                    duration: animationTime,
                    ease: 'cubic',
                    repeat: 0,
                    yoyo: false
                });
                break;

            default:
                break;
        }

        // Path graphics settings
        graphics.lineStyle(3, 0xffffff, 0.5);
        this.setPath(path);
        path.draw(graphics, 128);

        this.startFollow({
            duration: animationTime,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                path.destroy();
                graphics.destroy();
                console.log('x: ' + this.x);
            }
        })
    }

    moveHardBankLeft() {
        this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 0, targetAngle: -90, clockwise: true })
    }
    moveBankLeft() {
        this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 0, targetAngle: -60, clockwise: true })
    }
    moveForward() {
        this.move('forward', { distance: 180, animationTime: 300 });
    }
    moveBankRight() {
        this.move('bank', { radius: 160, animationTime: 400, angleAdjust: 180, targetAngle: 60, clockwise: false })
    }
    moveHardBankRight() {
        this.move('bank', { radius: 100, animationTime: 400, angleAdjust: 180, targetAngle: 90, clockwise: false })
    }
}

