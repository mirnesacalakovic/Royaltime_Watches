export const INCREMENT_CONUTER = "INCREMENT_CONUTER";
export const DECREMENT_CONUTER = "DECREMENT_CONUTER";


export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: "YARC - yet another redux counter"
}

export function increment(amount = 1) {
    return {
        type: INCREMENT_CONUTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT_CONUTER,
        payload: amount
    }
}

export default function counterReducer (state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_CONUTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT_CONUTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state;
    }
    
    
    
    return state;
}