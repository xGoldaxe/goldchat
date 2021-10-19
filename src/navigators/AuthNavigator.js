import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View, StatusBar } from 'react-native'
import { RegisterContext, RegisterContextContainer } from '../contexts/registerContext/userContext/registerContext';
import NotConnectedScreen from '../screens/NotConnectedScreen'
import AboutYouScreen from '../screens/auth/AboutYouSceen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import PhoneNumberScreen from '../screens/auth/PhoneNumberScreen';
import VerificationCodeSreen from '../screens/auth/VerificationCodeScreen';
import GenerateAccountScreen from '../screens/auth/GenerateAccountScreen';
import { BGCOLOR } from '../environement.js';
import Title from '../components/Title';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {

    return (
        <RegisterContextContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShadowVisible: false,
                    title: '',
                    headerStyle: {
                        backgroundColor: BGCOLOR,
                    },
                    animation: 'slide_from_right'
                }}
            >
                <Stack.Screen 
                    name="Home" 
                    component={NotConnectedScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="About You"
                    component={AboutYouScreen}
                />
                <Stack.Screen
                    name="Create Account"
                    component={CreateAccountScreen}
                    initialParams={{ error: null }}
                />
                <Stack.Screen
                    name="Phone Number"
                    component={PhoneNumberScreen}
                    initialParams={{ error: null }}
                />
                <Stack.Screen
                    name="Verification Code"
                    component={VerificationCodeSreen}
                    initialParams={{ error: null }}
                />
                <Stack.Screen
                    name="Generate Account"
                    component={GenerateAccountScreen}
                />
            </Stack.Navigator>
        </RegisterContextContainer>
    )
}

const styles = StyleSheet.create({})
