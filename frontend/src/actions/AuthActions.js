import Cookies from "js-cookie";

export const REGISTRATION_PENDING = "REGISTRATION_PENDING";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function getRegistrationPending(){ return { type: REGISTRATION_PENDING } }
function getRegistrationFail(err){ return { type: REGISTRATION_FAILURE, err: err } }
function getRegistrationSuccess(){ return { type: REGISTRATION_SUCCESS, payload: 'login' } }

function getLoginPending(){ return { type: LOGIN_PENDING } }
function getLoginFail(err){ return { type: LOGIN_FAILURE, err: err } }
function getLoginSuccess(matrikel){ return { type: LOGIN_SUCCESS, matrikel: matrikel, payload: 'landing' } }

export function registerUserAction(matrikel, name, email, password){
    return dispatch => {
        dispatch(getRegistrationPending());
        registerUser(matrikel, name, email, password)
            .then(() => {
                Cookies.set('currentPage', 'login')
                dispatch(getRegistrationSuccess())
            })
            .catch(err => {
                dispatch(getRegistrationFail(err))
            })
    }
}
function registerUser(matrikel, name, email, password, admin, department, creditPoints){
    const registrationForm = {
        name: name,
        password: password,
        studentId: matrikel,
        email: email,
        admin: admin,
        department: department,
        creditPoints: creditPoints
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationForm)
    }

    return fetch('http://localhost:8081/api/user', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error while registrating');
            }
            return response.json();
        })
}

export function loginAction(loginId, password){
    return dispatch => {
        dispatch(getLoginPending());
        login(loginId, password)
            .then(mat => {
                Cookies.set('currentPage', 'landing');
                Cookies.set('loggedIn', true);
                dispatch(getLoginSuccess(mat))
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

    return fetch('http://localhost:8081/api/login/login', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error logging in');
            }
            return loginId;
        })
}

/*
if login ok: 
    status code 200
    body: userResource
    loginResult
*/

export function deleteAntragAction(loginId, antrag){
    console.log("placeholder delete " + antrag + loginId)
}
//function deleteAntrag(loginId, password){
//    return "placeholder"
//}

export function editAntragAction(loginId, antrag){
    console.log("placeholder edit " + antrag + loginId)
}
//function editAntrag(loginId, password){
//    return "placeholder"
//}