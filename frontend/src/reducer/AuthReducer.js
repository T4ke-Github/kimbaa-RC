const initialState = {
    admin: false,
    matrikel: "",
    name: "",
    surname: "",
}

function authReducer(state = initialState, action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}

export default authReducer;