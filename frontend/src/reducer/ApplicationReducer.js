import * as appActions from "../actions/ApplicationActions";
import * as navActions from "../actions/NavActions";
import Cookies from 'js-cookie';

const initialState = {
    applications: [],
}

function appReducer(state = initialState, action){
    switch(action.type){
        case appActions.APPLICATION_SAVE:
            Cookies.set('applications', [...state.applications, action.application]);
            return{
                ...state,
                applications: [...state.applications, action.application],
            }
        case navActions.LANDING:
            Cookies.remove('applications');
            return{
                ...state,
                applications: []
            }
        default:
            return{
                ...state,
            }
    }
}

export default appReducer;