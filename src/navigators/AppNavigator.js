import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Text>Its a test</Text>
  );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} /> 
        }}
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                title: 'Overview'
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
