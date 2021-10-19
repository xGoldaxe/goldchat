export const userReducer = (state , action) => {
    const { type, payload } = action;

    if(type === "UPDATE") {
        var newState = {};
        newState.pseudo = payload.pseudo;
        newState.id = payload.id;
        newState.tokenAuth = payload.tokenAuth;
        return {...newState};
    } 
    return state
}