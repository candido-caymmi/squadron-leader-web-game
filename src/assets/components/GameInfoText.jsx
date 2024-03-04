import * as React from 'jsx-dom'

function GameInfoText(title, id) {
    return <div 
    class="opacity-75"
    style="width: 250px;">
        <h4 class="float-left" id={id}>
            {title}
        </h4>
    </div>
}

export default GameInfoText;