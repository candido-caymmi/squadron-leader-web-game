export default class LoaderScene extends Phaser.Scene {

	preload() {
		this.load.image('planeA', "./assets/images/planeA.png")
		this.load.image('planeB', "./assets/images/planeB.png")
	}

	create() {
		this.scene.start("game");
	}
}
