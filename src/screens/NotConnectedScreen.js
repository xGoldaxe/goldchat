import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View, StatusBar } from 'react-native'
import ChoiceModal from '../components/ChoiceModal'
import RegularButtonLink from '../components/RegularButtonLink'
import Title from '../components/Title'
import { UserContext } from '../contexts/userContext/userContext'
import pageView from '../styles/pageView'

export default function NotConnectedScreen({ navigation }) {
    const { content, updateUser } = useContext(UserContext);

    function connection() {
        updateUser('Goldaxe', '1ez545021az66e', 'TOKEN:5A41Zda5z4AF1A5F0ada51a');
    }

    function useRegister() {
        navigation.navigate('About You');
    }

    return (
        <View style={pageView.pageFlex}>
            <Title size={1}>Gold Chat</Title>
            <View style={pageView.pageView}>
                <RegularButtonLink 
                    title="Register"
                    options={{
                        onPress: useRegister
                    }}
                />
                <RegularButtonLink 
                    title="Login"
                    options={{
                        onPress: connection
                    }}
                />
                <Title size={5}>By subscribing, you accpet the CGU, CGC and other things..</Title>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
