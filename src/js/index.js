import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";
// TODO: Maybe separate game logic from styling.
import "../css/style.css";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
     // Fit to window
     // mode: Phaser.Scale.FIT,
     // Center vertically and horizontally
     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  input: {
    wheel: true
  },
  scene: [LoaderScene, GameScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
