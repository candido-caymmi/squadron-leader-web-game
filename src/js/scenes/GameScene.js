import Plane from "../gameObjects/Plane";
import Player from "../gameObjects/Player";
import UIHandler from "../gameObjects/UIHandler";
import InputHandler from "../gameObjects/InputHandler";
import TurnHandler from "../gameObjects/TurnHandler";
import { MAP } from "../constants/map";
import { CAMERA } from "../constants/camera";


export default class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: "game", active: false, visible: false });
	}

	create() {
		this.inputHandler = new InputHandler(this);
		this.turnHandler = new TurnHandler(this, this.inputHandler);
		this.UI = new UIHandler(this, this.turnHandler);
		
		// Main camera setup
		this.cameras.main.setBounds(0, 0, CAMERA.SCREEN_LIMITS_X, CAMERA.SCREEN_LIMITS_Y);

		// Map/map borders setup
		const mapBorders = this.add.rectangle(
			MAP.MARGIN,
			MAP.MARGIN, 
			MAP.LIMITS_X - MAP.MARGIN, 
			MAP.LIMITS_Y - MAP.MARGIN,
		).setOrigin(0);
		mapBorders.setStrokeStyle(4, 0xFFFFFF)

		this.planeA = new Plane(this, MAP.LIMITS_X/2, MAP.LIMITS_Y - 100, 'planeA');
		this.planeB = new Plane(this, MAP.LIMITS_X/2, MAP.MARGIN + 100, 'planeB').setAngle(180);
		
		// Adds planes to players
		this.playerA = new Player('Fulano');
		this.playerA.setPlane(this.planeA);
		this.playerB = new Player('Ciclano');
		this.playerB.setPlane(this.planeB);

		// Adds players to TurnHandler
		this.turnHandler.addPlayer(this.playerA);
		this.turnHandler.addPlayer(this.playerB);

		// Sets initially controlled plane
		// NOTE: should always be the first on the player list
		this.inputHandler.setControlledPlane(this.planeA);

		// Updates current player's text 
		this.UI.updatePlayerNameText();
		this.UI.updatePlaneRemainingActionsText();
		
	}

	update() {
		this.inputHandler.handleCursorKeys();
	}
}
