import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import ChoiceModal from './src/components/ChoiceModal';
import { UserContextContainer } from './src/contexts/userContext/userContext';
import { BGCOLOR } from './src/environement';
import AppNavigator from './src/navigators/AppNavigator';
import MainRouter from './src/navigators/MainRouter';
import NotConnectedScreen from './src/screens/NotConnectedScreen';


export default function App() {

  return (
    <UserContextContainer>
      <StatusBar 
        backgroundColor={BGCOLOR} 
        barStyle='dark-content'
      />
      <NavigationContainer>
        <MainRouter />
      </NavigationContainer>
    </UserContextContainer>
  )
}