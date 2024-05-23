import * as authActions from '../actions/AuthActions';

const initialState = {
    matrikel: "",
    loggedIn: Cookies.get('loggedIn') === 'true' || false,
    err: null
}

function authReducer(state = initialState, action){
    switch(action.type){
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                matrikel: action.matrikel,
                loggedIn: true,
            }
        default:
            return{
                ...state
            }
    }
}

export default authReducer;