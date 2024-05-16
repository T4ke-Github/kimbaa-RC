import * as navActions from "../actions/NavActions";
import * as authActions from "../actions/AuthActions";

const initialState = {
    page: "login"
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case navActions.LOGIN:
            return{
                ...state,
                page: "login"
            }
        case navActions.LANDING:
            return{
                ...state,
                page: "landing"
            }
        case navActions.REGISTRATION:
            return{
                ...state,
                page: "registration"
            }
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                page: "landing"
            }
        default:
            return{
                ...state
            }
    }
};

export default rootReducer;