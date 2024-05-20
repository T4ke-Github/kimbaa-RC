import * as navActions from "../actions/NavActions";
import * as authActions from "../actions/AuthActions";
import Cookies from 'js-cookie'

const initialState = {
    page: Cookies.get('currentPage') || 'login',
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case navActions.LOGIN:
        case navActions.LANDING:
        case navActions.REGISTRATION:
        case authActions.REGISTRATION_SUCCESS:
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                page: action.payload
            }
        default:
            return{
                ...state
            }
    }
};

export default rootReducer;