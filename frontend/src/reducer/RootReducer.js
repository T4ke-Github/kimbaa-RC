import * as navActions from "../actions/NavActions";

const initialState = {
    page: "login"
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case navActions.LOGIN:
            return{
                ...state,
                page: "land"
            }
        case navActions.LOGOUT:
            return{
                ...state,
                page: "login"
            }
        default:
            return{
                ...state
            }
    }
};

export default rootReducer;