import Plane from "../gameObjects/Plane";
import Player from "../gameObjects/Player";
import GameUIHandler from "../handlers/UI/GameUIHandler";
import InputHandler from "../handlers/InputHandler";
import TurnHandler from "../handlers/TurnHandler";
import { SCENES } from "../constants/sceneKeys";
import { MAP } from "../constants/map";
import { CAMERA } from "../constants/camera";


export default class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: SCENES.GAME, active: false, visible: false });
	}

	create() {
		this.inputHandler = new InputHandler(this);
		this.turnHandler = new TurnHandler(this, this.inputHandler);
		
		// Background Grid 
		this.add.image(CAMERA.SCREEN_LIMITS_X*0.5, CAMERA.SCREEN_LIMITS_Y*0.5, 'grid');
		this.UI = new GameUIHandler(this, this.turnHandler);

		// Main camera setup
		this.cameras.main.setBounds(0, 0, CAMERA.SCREEN_LIMITS_X, CAMERA.SCREEN_LIMITS_Y);

		// Map/map borders setup
		const mapBorders = this.add.rectangle(
			MAP.MARGIN,
			MAP.MARGIN, 
			MAP.LIMITS_X - MAP.MARGIN, 
			MAP.LIMITS_Y - MAP.MARGIN,
		).setOrigin(0);
		mapBorders.setStrokeStyle(4, 0x1E1E1E)

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
		// NOTE: should always be the first on the player list // TO-DO: Make this automatic 
		this.inputHandler.setControlledPlane(this.planeA);

		// Updates current player's text for the first time
		this.UI.updatePlayerNameText();
		this.UI.state.updatePlaneRemainingActionsText();
	}

	update() {
		this.inputHandler.handleCursorKeys();
	}
}
