import { getNavLandingAction } from './NavActions';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function getLoginSuccess(matrikel){
    return{
        type: LOGIN_SUCCESS,
        matrikel: matrikel
    }
}

export function registerUserAction(matrikel, name, email, password){
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
                throw new Error('Error adding course');
            }
            console.log(response);
        })
}

export function loginAction(matrikel, password){
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
                throw new Error('Error adding course');
            }
            console.log(response);
            getLoginSuccess(matrikel);
            getNavLandingAction();
        })
}