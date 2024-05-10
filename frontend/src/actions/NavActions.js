export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function getNavLoginAction(){
    return {
        type: LOGIN
    }
}
export function getNavLogoutAction(){
    return {
        type: LOGOUT
    }
}