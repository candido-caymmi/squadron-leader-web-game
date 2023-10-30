import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";
// TODO: Maybe separate game logic from styling.
import "../css/style.css";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
     mode: Phaser.Scale.ENVELOP,
  },
  input: {
    wheel: true
  },
  scene: [LoaderScene, GameScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
