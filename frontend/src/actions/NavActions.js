import Cookies from 'js-cookie';

export const LOGIN = "LOGIN";
export const LANDING = "LANDING";
export const REGISTRATION = "REGISTRATION";
export const APPLICATION = "APPLICATION";
export const USEREDIT = "USEREDIT"

export function getNavLoginAction(){
    Cookies.set('currentPage', 'login');
    Cookies.remove('userResource');
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
export function getNavApplicationPageAction(){
    Cookies.set('currentPage', 'application');
    return {
        type: APPLICATION,
        payload: 'application'
    }
}
export function getNavUserEditPageAction(){
    Cookies.set('currentPage', 'userEdit');
    return {
        type: USEREDIT,
        payload: 'userEdit'
    }
}