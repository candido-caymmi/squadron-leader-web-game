import GameUIMovementState from "./GameUIMovementState";
import GameUIHandler from "../../handlers/UI/GameUIHandler";
import SmallButton from "../../../assets/components/SmallButton";
import GameInfoText from "../../../assets/components/GameInfoText";

export default class GameUIAttackState {
    constructor(gameUIHandler) {
        this.gameUIHandler = gameUIHandler;
    }

    addButtons() { }
    
    addText() { }

    switchStates() {  
        this.gameUIHandler.state = new GameUIMovementState(this.gameUIHandler);
    }
}