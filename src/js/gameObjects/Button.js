export default class Button {
    constructor(scene, x, y, label, callback){
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
        this.button.setScrollFactor(0);
    }
}