import * as demoActions from "../actions/NavActions";

const initialState = {
    page: "login"
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case demoActions.LOGIN:
            return{
                ...state,
                page: "land"
            }
        case demoActions.LOGOUT:
            return{
                ...state,
                loggedIn: "land"
            }
        default:
            return{
                ...state
            }
    }
};

export default rootReducer;