export const MOVEMENT_ACTIONS = {
    HARD_BANK_LEFT: 'hard_bank',
    BANK_LEFT: 'bank_left',
    MOVE_FORWARD: 'move_forward',
    BANK_RIGHT: 'bank_right',
    HARD_BANK_RIGHT: 'hard_bank_right',
};

export const MOVEMENT_COSTS = {
    [MOVEMENT_ACTIONS.HARD_BANK_LEFT]: 3,
    [MOVEMENT_ACTIONS.BANK_LEFT]: 2,
    [MOVEMENT_ACTIONS.MOVE_FORWARD]: 1,
    [MOVEMENT_ACTIONS.BANK_RIGHT]: 2,
    [MOVEMENT_ACTIONS.HARD_BANK_RIGHT]: 3,
}