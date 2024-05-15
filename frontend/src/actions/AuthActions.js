import { getNavLandingAction } from './NavActions';

export const REGISTRATION_PENDING = "REGISTRATION_PENDING";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function getRegistrationPending(){ return { type: REGISTRATION_PENDING } }
function getRegistrationFail(err){ return { type: REGISTRATION_FAILURE, err: err } }
function getRegistrationSuccess(){ return { type: REGISTRATION_FINISHED } }

function getLoginPending(){ return { type: LOGIN_PENDING } }
function getLoginFail(err){ return { type: LOGIN_FAILURE, err: err } }
function getLoginSuccess(matrikel){ return { type: LOGIN_SUCCESS, matrikel: matrikel } }

export function registerUserAction(matrikel, name, email, password){
    return dispatch => {
        dispatch(getRegistrationPending());
        registerUser(matrikel, name, email, password)
            .then(() => {
                dispatch(getRegistrationSuccess())
            })
            .catch(err => {
                dispatch(getRegistrationFail(err))
            })
    }
}
function registerUser(matrikel, name, email, password){
    const registrationForm = {
        name: name,
        password: password,
        studenId: matrikel,
        email: email
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(registrationForm)
    }

    return fetch('https://localhost/api/user/create', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error while registrating');
            }
            return response.json();
        })
}

export function loginAction(matrikel, password){
    return dispatch => {
        dispatch(getLoginPending());
        login(matrikel, password)
            .then(mat => {
                dispatch(getLoginSuccess(mat))
            })
            .catch(err => {
                dispatch(getLoginFail(err))
            })
    }
}
function login(matrikel, password){
    const registrationForm = {
        studentId: matrikel,
        password: password
    }
    
    const requestOptions = {
        method: 'POST'
    }

    return fetch('https://localhost/api/login/login', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error logging in');
            }
            return matrikel;
        })
}