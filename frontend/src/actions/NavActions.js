export const LOGIN = "LOGIN";
export const LANDING = "LANDING";

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