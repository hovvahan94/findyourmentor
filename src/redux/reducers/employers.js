import firebase from '../../firebase';

const initialState = {
    employers: []
}

const employers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYERS':
            return {
                ...state,
                employers: action.payload
            }
        default:
            return state;
    }
}

export default employers;