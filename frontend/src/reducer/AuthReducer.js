import * as authActions from '../actions/AuthActions';
import * as navActions from '../actions/NavActions';
import Cookies from 'js-cookie';

const initialState = {
    loggedIn: Cookies.get('loggedIn') === 'true' || false,
    userResource: null,
    err: null
}

function authReducer(state = initialState, action){
    switch(action.type){
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                userResource: action.userResource,
                loggedIn: true,
            }
        case navActions.LOGIN:
            return{
                ...state,
                loggedIn: false,
                userResource: null
            }
        default:
            return{
                ...state
            }
    }
}

export default authReducer;