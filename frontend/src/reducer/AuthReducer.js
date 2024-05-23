import * as authActions from '../actions/AuthActions';
import * as navActions from '../actions/NavActions';
import Cookies from 'js-cookie';

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
        case navActions.LOGIN:
            return{
                ...state,
                loggedIn: false
            }
        default:
            return{
                ...state
            }
    }
}

export default authReducer;