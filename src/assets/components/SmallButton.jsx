import * as React from 'jsx-dom'

function SmallButton(title) {
    return <button
        type="button"
        class="btn btn-light fw-semibold opacity-75"
        style="border: solid; border-width: 3px; border-color: #191923; text-color: #191923; width: 250px; height: 50px;"
    >
        {title}
    </button>
}

export default SmallButton;