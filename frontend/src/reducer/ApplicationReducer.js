import * as appActions from "../actions/ApplicationActions";
import * as navActions from "../actions/NavActions";
import Cookies from 'js-cookie';

const initialState = {
    application: Cookies.get('application') ? JSON.parse(Cookies.get('application')) : "empty",
}

function appReducer(state = initialState, action){
    switch(action.type){
        case appActions.APPLICATION_SUCCESS:
            Cookies.set('application', [...state.application, action.application], { sameSite: 'Strict' });
            return{
                ...state,
            }
        case navActions.LOGIN:
            Cookies.remove('application');
            return{
                ...state,
                application: [],
            }
        default:
            return{
                ...state,
            }
    }
}

export default appReducer;