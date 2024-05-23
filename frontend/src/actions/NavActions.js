import Cookies from 'js-cookie';

export const LOGIN = "LOGIN";
export const LANDING = "LANDING";
export const REGISTRATION = "REGISTRATION";
export const ANTRAG = "ANTRAG";

export function getNavLoginAction(){
    Cookies.set('currentPage', 'login');
    return {
        type: LOGIN,
        payload: 'login'
    }
}
export function getNavLandingAction(){
    Cookies.set('currentPage', 'landing');
    return {
        type: LANDING,
        payload: 'landing'
    }
}
export function getNavRegistrationPageAction(){
    Cookies.set('currentPage', 'registration');
    return {
        type: REGISTRATION,
        payload: 'registration'
    }
}
export function getAntragPageAction(){
    return {
        type: ANTRAG
    }
}