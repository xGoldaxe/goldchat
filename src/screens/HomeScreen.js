import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import authApi from '../api/auth';
import Counter from '../components/Counter';
import RegularButtonLink from '../components/RegularButtonLink';
import Title from '../components/Title';
import { UserContext } from '../contexts/userContext/userContext';

export default function HomeScreen({ navigation }) {
    const { content, loggedOut } = useContext(UserContext);

    async function apiCall() {
        const response = await authApi.get('/test');
    };

    return (
        <View style={styles.pageView}>
            <Title size={2}>Home Screen</Title>
            <Title size={3}>Connected as: {content.pseudo}</Title>
            <Title size={5}>Id: {content.id}</Title>
            <Title size={5}>{content.tokenAuth}</Title>
            <Button 
                title="API CALL"
                onPress={apiCall}
            />
            <RegularButtonLink
                title="Logged out"
                options={{
                    onPress: loggedOut
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
