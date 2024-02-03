import { SCENES } from "../constants/sceneKeys";

export default class LoaderScene extends Phaser.Scene {

	preload() {
		this.load.image('planeA', "./assets/images/planeA.png")
		this.load.image('planeB', "./assets/images/planeB.png")
		this.load.image('grid', "./assets/images/grid.png")
		this.load.image('squadronLeaderLogo', "./assets/images/squadronLeaderLogo.png")
	}

	create() {
		this.scene.start(SCENES.MAIN_MENU);
	}
}
