import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../contexts/userContext/userContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export default function MainRouter() {
    const { content } = useContext(UserContext);

    return (
        <>
            { content.pseudo ? 
            <AppNavigator />
            : <AuthNavigator />
            }
        </>
    )
}

const styles = StyleSheet.create({})
