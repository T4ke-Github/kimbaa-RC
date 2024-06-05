import * as authActions from '../actions/AuthActions';
import * as navActions from '../actions/NavActions';
import * as appActions from '../actions/ApplicationActions';

import Cookies from 'js-cookie';

const initialState = {
    loggedIn: Cookies.get('loggedIn') === 'true' || false,
    userResource: Cookies.get('userResource') ? JSON.parse(Cookies.get('userResource')) : null,
    err: null
}

function authReducer(state = initialState, action){
    switch(action.type){
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                loggedIn: true,
                userResource: action.userResource,
            }
        case navActions.LOGIN:
            return{
                ...state,
                loggedIn: false,
                userResource: null
            }
        case appActions.REFRESH_SUCCESS:
            return{
                ...state,
                userResource: action.userResource
            }
        default:
            return{
                ...state
            }
    }
}

export default authReducer;

/*
userResource = {
    name: string; // Required
    password: string; // Required
    admin?: boolean; // Optional, default: false
    studentId: string; // Required, unique
    application?: string;
    address?: string;
    email?: string; // Optional
    createdAt?: Date; // Required
    updatedAt?: Date; // Optional
    course?: string; // Optional
}
*/