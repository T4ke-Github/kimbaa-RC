import * as appActions from "../actions/ApplicationActions";
import * as navActions from "../actions/NavActions";
import Cookies from 'js-cookie';

const initialState = {
    applications: Cookies.get('applications') ? JSON.parse(Cookies.get('applications')) : [],
    playTestApplication: Cookies.get('playTestApplication') ? JSON.parse(Cookies.get('playTestApplication')) : "",
}

function appReducer(state = initialState, action){
    switch(action.type){
        case appActions.APPLICATION_SAVE:
            Cookies.set('applications', [...state.applications, action.application], { sameSite: 'Strict' });
            return{
                ...state,
                applications: [...state.applications, action.application],
            }
        case appActions.APPLICATION_SUCCESS:
            Cookies.set('playTestApplication', action.playTestApplication, { sameSite: 'Strict' });
            return{
                ...state,
                playTestApplication: action.playTestApplication,
            }
        case navActions.LOGIN:
            Cookies.remove('applications');
            Cookies.remove ('playTestApplication');
            return{
                ...state,
                applications: [],
                playTestApplication: "",
            }
        default:
            return{
                ...state,
            }
    }
}

export default appReducer;