import Cookies from "js-cookie";
const BACKEND_URL = process.env.BACKEND_URL;


export const REGISTRATION_PENDING = "REGISTRATION_PENDING";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const REGISTRATION_FAILURE_USER_EXISTS = "REGISTRATION_FAILURE_USER_EXISTS";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function getRegistrationPending(){ return { type: REGISTRATION_PENDING } }
function getRegistrationFail(err){ return { type: REGISTRATION_FAILURE, err: err } }
function getRegistrationFailUserExists(){ return { type: REGISTRATION_FAILURE_USER_EXISTS } }
function getRegistrationSuccess(){ return { type: REGISTRATION_SUCCESS, payload: 'login' } }

function getLoginPending(){ return { type: LOGIN_PENDING } }
function getLoginFail(err){ return { type: LOGIN_FAILURE, err: err } }
function getLoginSuccess(user){ return { type: LOGIN_SUCCESS, userResource: user, payload: 'landing' } }

export function registerUserAction(matrikel, name, email, password){
    return dispatch => {
        dispatch(getRegistrationPending());
        registerUser(matrikel, name, email, password)
            .then(() => {
                Cookies.set('currentPage', 'login', { sameSite: 'Strict' })
                dispatch(getRegistrationSuccess())
            })
            .catch(err => {
                const errorMessage = err.message;
                if(errorMessage === "User Already Exists"){
                    dispatch(getRegistrationFailUserExists())
                }else{
                    dispatch(getRegistrationFail(err))
                }
            })
    }
}
function registerUser(matrikel, name, email, password){
    const registrationForm = {
        name: name,
        password: password,
        studentId: matrikel,
        email: email
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationForm)
    }

    console.log('fetching: '+ BACKEND_URL + '/api/user')
    return fetch(BACKEND_URL + '/api/user', requestOptions)
        .then(response => {
            if(!response.ok){
                if(response.status === 400){
                    throw new Error('User Already Exists');
                }
                throw new Error('Error while registrating');
            }
            return response.json();
        })
}

export function loginAction(loginId, password){
    return dispatch => {
        dispatch(getLoginPending());
        login(loginId, password)
            .then(user => {
                Cookies.set('currentPage', 'landing', { sameSite: 'Strict' });
                Cookies.set('loggedIn', true, { sameSite: 'Strict' });
                Cookies.set('userResource', JSON.stringify(user), { sameSite: 'Strict' });
                dispatch(getLoginSuccess(user))
            })
            .catch(err => {
                dispatch(getLoginFail(err))
            })
    }
}
function login(loginId, password){
    const loginData = {
        studentId: loginId,
        password: password
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    }

    console.log('fetching: ' + BACKEND_URL + '/api/login/login')
    return fetch(BACKEND_URL + '/api/login/login', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error logging in');
            }
            return response.json();
        })
        .then(data => {
            return data.user;
        })
}

/*
if login ok:
    status code 200
    body: userResource
    loginResult
*/