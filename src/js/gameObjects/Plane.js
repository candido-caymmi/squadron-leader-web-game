export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);
    }

    move() {
        const path = new Phaser.Curves.Path(this.x, this.y);

        const radius = 100;
        const startAngle = this.angle + 180;
        const endAngle = this.angle + 360 - 0.01;

        const verticalMoveDistance = this.height / 2;
        const lineX = this.x + (radius * 2) * Math.cos(Phaser.Math.DegToRad(endAngle));
        const lineY = this.y + (Math.sin(Phaser.Math.DegToRad(endAngle)) >= 0 ? -verticalMoveDistance : verticalMoveDistance);

        path.ellipseTo(radius, radius, startAngle, endAngle, false, 0);
        path.lineTo(lineX, lineY);

        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xffffff, 0.5);

        this.setPath(path);
        path.draw(graphics, 128);

        console.log('Angle: ' + this.angle);

        this.startFollow({
            duration: 1000,
            yoyo: false,
            repeat: 0,
            rotateToPath: true,
            verticalAdjust: true,
            rotationOffset: 90,
            onComplete: () =>{
                console.log('Post-move Angle: ' + this.angle);
                path.destroy();
                graphics.destroy();
            }
        });
    }
}