export default class Plane extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture) {
        super(scene, new Phaser.Curves.Path(), x, y, texture);
        scene.add.existing(this);
    }

    move() {
        const path = new Phaser.Curves.Path(this.x, this.y);
        path.ellipseTo(100, 100, this.angle + 180, this.angle + 360, false, 0);
        path.lineTo();

        const graphics = this.scene.add.graphics();
        graphics.lineStyle(1, 0xffffff, 0.5);

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
                console.log('Angle: ' + this.angle);
                path.destroy;
            }
        });
    }
}