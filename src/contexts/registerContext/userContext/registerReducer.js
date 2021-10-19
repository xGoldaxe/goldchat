import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerReducer = (state , action) => {
    const { type, payload } = action;

    if(type === "UPDATE") {
        var newState = state;
        Object.assign(newState, payload.keysValues);
        updateAsyncStorage(newState);
        return {...newState};
    } 
    return state
}

async function updateAsyncStorage(state) {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem('registerState', jsonValue);
}