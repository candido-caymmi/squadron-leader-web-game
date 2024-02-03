import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from "./scenes/GameScene";
// TODO: Maybe separate game logic from styling.
import "../css/style.css";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'phaser-container',
  dom: {
    createContainer: true
  },
  input: {
    wheel: true
  },
  scene: [LoaderScene, MainMenuScene, GameScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
