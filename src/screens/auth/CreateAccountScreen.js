import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import RegularButtonLink from '../../components/RegularButtonLink';
import RegularInput from '../../components/RegularInput';
import Title from '../../components/Title';
import pageView from '../../styles/pageView';
import { RegisterContext } from '../../contexts/registerContext/userContext/registerContext';
import authApi from '../../api/auth';

export default function CreateAccountScreen({ route, navigation }) {
    const [isInputsValid, setIsInputsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const { registerValue, update, getUserObject } = useContext(RegisterContext);
    const { nickname, password } = registerValue;

    useEffect(() => {
        verifyInput({password, nickname })
    }, [password, nickname])

    useEffect(() => {
        const unsubscribe = navigation.addListener('transitionEnd', () => {
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    function updateNickname(value) {
        update({
            nickname: value
        })
    }

    function updatePassword(value) {
        update({
            password: value
        })
    }

    function verifyInput(values) {
        let { password, nickname } = values;
        if (password.length > 3 && nickname.length > 3) {
            setIsInputsValid(true);
        } else {
            setIsInputsValid(false);
        }
    }

    async function verificationNickname() {
        try {
            const response = await authApi.post('/nicknameVerification', {
                user: getUserObject()
            });
            if (response.status == 200) {
                return (true);
            }
        } catch (err) {
            return (err);
        }
    }

    async function goNextPage() {
        setLoading(true);
        const nicknameAlreadyUsed = await verificationNickname();
        if (nicknameAlreadyUsed == true) {
            navigation.navigate('Phone Number');
        } else {
            navigation.setParams({
                error: nicknameAlreadyUsed.message
            })
            setLoading(false);
        }
    }

    return (
        <View style={[pageView.spaceBt, {}]}>
            <View style={styles.inputs}>
                <Title size={2}>Create Account</Title>
                <RegularInput 
                    state={nickname} 
                    onChangeText={updateNickname}
                    label='Nickname'
                />
                <RegularInput 
                    state={password} 
                    onChangeText={updatePassword}
                    label='Password'
                />
                <Title size={3}>{route.params.error && route.params.error}</Title>
            </View>
            <RegularButtonLink 
                options={{
                    disabled: !isInputsValid,
                    onPress: goNextPage
                }}
                title="Continue"
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputs: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 50
    }
})
