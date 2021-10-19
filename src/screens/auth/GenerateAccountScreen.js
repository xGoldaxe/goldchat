import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, ActivityIndicator, View } from 'react-native'
import Title from '../../components/Title';
import pageView from '../../styles/pageView';
import authApi from '../../api/auth';

export default function GenerateAccountScreen({ route, navigation }) {
    const { verificationCode, userId } = route.params;
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        sendCode(verificationCode)
    }, [])

    async function sendCode(value) {
        setLoading(true)
        try {
            const response = await authApi.post('/verifyCode', {
                verificationCode: value,
                id: userId
            });
            console.log(response.data.messsage);
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }

    return (
        <View style={[pageView.spaceBt, {}]}>
            <View style={styles.inputs}>
                <Title size={2}>We Create Your Account</Title>
                <Text>Code sent : {verificationCode}</Text>
            </View>
            {loading && <ActivityIndicator size="large" color="black"/>}
        </View>
    )
}

const styles = StyleSheet.create({
})
