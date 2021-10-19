import React, { useRef, useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RegularButtonLink from '../../components/RegularButtonLink';
import Title from '../../components/Title';
import pageView from '../../styles/pageView';
import { RegisterContext } from '../../contexts/registerContext/userContext/registerContext';
import isNumber from '../../lib/isNumber';
import RegularInput from '../../components/RegularInput';
import Counter from '../../components/Counter';
import authApi from '../../api/auth';
import useRegister from '../../lib/useRegister';

export default function VerificationCodeSreen({ route, navigation }) {
    const { getUserObject } = useContext(RegisterContext);
    const { userId, expirationTime } = route.params;
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const register = useRegister(navigation, setLoading);

    useEffect(() => {
        setFocus();
        const unsubscribe = navigation.addListener('transitionEnd', () => {
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    function editVerificationCode(value) {
        if (value.length <= 4 && isNumber(value)) {
            setVerificationCode(value);
        }
        if (value.length == 4) {
            sendCode(value);
        }
    }

    async function sendCode(value) {
        navigation.navigate('Generate Account', {
            verificationCode: value,
            userId: userId,
        })
    }

    function setFocus() {
        inputRef.current.focus();
    }

    function registerFunc() {
        register(getUserObject());
    }

    return (
        <View style={[pageView.spaceBt, {}]}>
            <View style={styles.inputs}>
                <Title size={2}>Verification Code</Title>
                <Title size={3}>a message as be sent!</Title>
                <Title size={4}>user id : {userId}</Title>
            </View>
            <RegularInput
                onChangeText={editVerificationCode}
                state={verificationCode}
                options={{
                    keyboardType: 'numeric',
                    ref: inputRef,
                    maxLength: 4
                }}
            />
            <Counter 
                time={Math.floor((new Date(expirationTime).getTime() - Date.now()) / 1000)}
                NextComp={
                    <RegularButtonLink 
                        options={{
                            onPress: registerFunc
                        }}
                        loading={loading}
                        title="Send again"
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputs: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 50
    },
    hiddenInput: {
        position: 'absolute',
        backgroundColor: 'red',
        top: -100,
    }
})
