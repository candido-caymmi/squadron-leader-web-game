import * as React from 'jsx-dom'

function Button(title) {
    return <button
        type="button"
        class="btn btn-light w-25 btn-lg fw-bold"
        style="border: solid; border-width: 4px; border-color: #191923; text-color: #191923;"
    >
        {title}
    </button>
}

export default Button;