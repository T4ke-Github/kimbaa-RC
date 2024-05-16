export const LOGIN = "LOGIN";
export const LANDING = "LANDING";
export const REGISTRATION = "REGISTRATION";

export function getNavLoginAction(){
    return {
        type: LOGIN
    }
}
export function getNavLandingAction(){
    return {
        type: LANDING
    }
}
export function getNavRegistrationPageAction(){
    return {
        type: REGISTRATION
    }
}