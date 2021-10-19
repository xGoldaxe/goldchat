import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useEffect } from 'react';
import {registerReducer} from './registerReducer';

export const RegisterContext = createContext(null);

export function RegisterContextContainer ({ children }) {
    useEffect(() => {
        loadRegister();
    }, [])

    async function loadRegister() {
        const keysValues = await AsyncStorage.getItem('registerState');
        update(JSON.parse(keysValues));
    }

    const initialeState = {
        name: '',
        birthDay: {
            day: '',
            mounth: '',
            year: ''
        },
        gender: 'Male',
        nickname: '',
        password: '',
        phoneNumber: ''
    }
    
    const [registerValue, dispatch] = useReducer(registerReducer, initialeState);

    function update(keysValues) {
        dispatch({
            type: 'UPDATE',
            payload: {
                keysValues
            }
        })
    }

    function getUserObject() {
        return {
            name: registerValue.name,
            birthDay: registerValue.birthDay,
            gender: registerValue.gender,
            nickname: registerValue.nickname,
            password: registerValue.password,
            phoneNumber: registerValue.phoneNumber
        }
    }

    const value = {
        registerValue: registerValue,
        update,
        getUserObject
    }

    return (
        <RegisterContext.Provider value={value}>
            {children}
        </RegisterContext.Provider>
    )
}
