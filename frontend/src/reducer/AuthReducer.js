import * as authActions from '../actions/AuthActions';

const initialState = {
    matrikel: ""
}

function authReducer(state = initialState, action){
    switch(action.type){
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                matrikel: action.matrikel
            }
        default:
            return{
                ...state
            }
    }
}

export default authReducer;