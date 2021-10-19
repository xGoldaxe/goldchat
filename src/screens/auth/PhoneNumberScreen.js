import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import RegularButtonLink from '../../components/RegularButtonLink';
import RegularInput from '../../components/RegularInput';
import Title from '../../components/Title';
import pageView from '../../styles/pageView';
import { RegisterContext } from '../../contexts/registerContext/userContext/registerContext';
import isNumber from '../../lib/isNumber';
import useRegister from '../../lib/useRegister';

export default function PhoneNumberScreen({ route, navigation }) {
    const [isInputsValid, setIsInputsValid] = useState(false)
    const { registerValue, update, getUserObject } = useContext(RegisterContext);
    const { phoneNumber } = registerValue;
    const [loading, setLoading] = useState(false);
    const register = useRegister(navigation, setLoading);

    useEffect(() => {
        const unsubscribe = navigation.addListener('transitionEnd', () => {
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        setIsInputsValid(verifyInput(phoneNumber));
    }, [phoneNumber])

    function setPhoneNumber(value) {
        if (isNumber(value)) {
            update({
                phoneNumber: value
            })
        }
    }

    function verifyInput(phoneNumber) {
        return (isNumber(phoneNumber) && phoneNumber.length == 9);
    }

    function registerFunc() {
        register(getUserObject());
    }

    return (
        <View style={[pageView.spaceBt, {}]}>
            <View style={styles.inputs}>
                <Title size={2}>Phone Number</Title>        
            </View>
            <RegularInput 
                    state={phoneNumber} 
                    onChangeText={setPhoneNumber}
                    label='Phone Number'
            />
            <Title size={3}>{route.params.error && route.params.error}</Title>
            <RegularButtonLink 
                options={{
                    onPress: registerFunc
                }}
                loading={loading}
                disabled={!isInputsValid}
                title="Continue"
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
