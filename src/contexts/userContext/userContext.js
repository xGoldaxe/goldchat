import React, { createContext, useReducer } from 'react';
import {userReducer} from './userReducer';

export const UserContext = createContext(null);

export const UserContextContainer = ({ children }) => {
    const initialeState = {
        pseudo: null,
        id: null,
        tokenAuth: null
    }
    
    const [userValue, dispatch] = useReducer(userReducer, initialeState);

    function updateUser(pseudo, id, tokenAuth) {
        dispatch({
            type: 'UPDATE',
            payload: {
                pseudo,
                id,
                tokenAuth
            }
        })
    }

    function loggedOut() {
        updateUser(null, null, null);
    }

    const value = {
        content: userValue,
        updateUser,
        loggedOut
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
