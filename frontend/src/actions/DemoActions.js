export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function getLoginAction(){
    return {
        type: LOGIN
    }
}
export function getLogoutAction(){
    return {
        type: LOGOUT
    }
}