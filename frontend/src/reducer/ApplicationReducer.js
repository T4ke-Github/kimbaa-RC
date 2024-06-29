import * as appActions from "../actions/ApplicationActions";
import * as navActions from "../actions/NavActions";
import Cookies from 'js-cookie';

const initialState = {
    applications: Cookies.get('applications') ? JSON.parse(Cookies.get('applications')) : [],
}

function appReducer(state = initialState, action){
    switch(action.type){
        case appActions.APPLICATION_SUCCESS:
            Cookies.set('applications', [...state.applications, action.application], { sameSite: 'Strict' });
            return{
                ...state,
                applications: [...state.applications, action.application],
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