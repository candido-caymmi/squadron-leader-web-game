import Plane from "../gameObjects/Plane";
import UIHandler from "../gameObjects/UIHandler";
import InputHandler from "../gameObjects/InputHandler";

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  preload() {

  }

  create() {
    const UI = new UIHandler(this);
    const inputHandler = new InputHandler(this);

    const plane = new Plane(this, 300, 300, 'planeA');
    inputHandler.setControlledPlane(plane);

  }

  update() {
    
  }
}
