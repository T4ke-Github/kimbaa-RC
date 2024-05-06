import * as demoActions from "../actions/DemoActions";

const initialState = {
    loggedIn: false
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case demoActions.LOGIN:
            return{
                ...state,
                loggedIn: true
            }
        case demoActions.LOGOUT:
            return{
                ...state,
                loggedIn: false
            }
        default:
            return{
                ...state
            }
    }
};

export default rootReducer;