import Plane from "../gameObjects/Plane";
import Player from "../gameObjects/Player";
import UIHandler from "../gameObjects/UIHandler";
import InputHandler from "../gameObjects/InputHandler";
import TurnHandler from "../gameObjects/TurnHandler";

const SCREEN_LIMITS_X = 2880;
const SCREEN_LIMITS_Y = 1620;

const MAP_LIMITS_X = 2680; 
const MAP_LIMITS_Y = 1420;
const MAP_MARGIN = 200;

export default class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: "game", active: false, visible: false });
	}

	preload() {
	
	}

	create() {
		this.inputHandler = new InputHandler(this);
		this.turnHandler = new TurnHandler(this, this.inputHandler);
		this.UI = new UIHandler(this, this.turnHandler);
		
		// Main camera setup
		this.cameras.main.setBounds(0, 0, SCREEN_LIMITS_X, SCREEN_LIMITS_Y);

		// Map/map borders setup
		const mapBorders = this.add.rectangle(
			MAP_MARGIN,
			MAP_MARGIN, 
			MAP_LIMITS_X - MAP_MARGIN, 
			MAP_LIMITS_Y - MAP_MARGIN
		).setOrigin(0);
		mapBorders.setStrokeStyle(4, 0xFFFFFF)

		this.planeA = new Plane(this, MAP_LIMITS_X/2, MAP_LIMITS_Y - 100, 'planeA');
		this.planeB = new Plane(this, MAP_LIMITS_X/2, MAP_MARGIN + 100, 'planeB').setAngle(180);
		
		// Adds planes to players
		this.playerA = new Player('Fulano');
		this.playerA.setPlane(this.planeA);
		this.playerB = new Player('Ciclano');
		this.playerB.setPlane(this.planeB);

		// Adds players to TurnHandler
		this.turnHandler.addPlayer(this.playerB);
		this.turnHandler.addPlayer(this.playerA);

		// Sets initially controlled plane
		this.inputHandler.setControlledPlane(this.planeB);

		// Updates current player's text 
		this.UI.updatePlayerNameText();
	}

	update() {
		this.inputHandler.handleCursorKeys();
	}
}
