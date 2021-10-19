import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import RegularButtonLink from '../../components/RegularButtonLink';
import RegularInput from '../../components/RegularInput';
import Title from '../../components/Title';
import pageView from '../../styles/pageView';
import { RegisterContext } from '../../contexts/registerContext/userContext/registerContext';
import DateInput from '../../components/DateInput';
import ChoiceInput from '../../components/ChoiceInput';
import { nickname } from '../../lib/userVerification';
import GenderMale from '../../../assets/genderMale.svg';
import GenderFemale from '../../../assets/genderFemale.svg';
import GenderOther from '../../../assets/genderOther.svg';

export default function AboutYouScreen({ navigation }) {
    const [isInputsValid, setIsInputsValid] = useState(false);
    const [dateError, setDateError] = useState({
        type: 'neutral',
        message: ''
    });
    const [nicknameError, setNicknameError] = useState({
        type: 'neutral',
        message: ''
    });
    const { registerValue, update } = useContext(RegisterContext);
    const { birthDay, name, gender } = registerValue;

    useEffect(() => {
        verifyInput({birthDay, name});
    })

    useEffect(() => {
        verifyInput({birthDay, name})
    }, [birthDay, name])


    function updateName(value) {
        update({
            name: value
        })
    }

    function updateBirthDay(value) {
        update({
            birthDay: value
        })
    }

    function updateGender(value) {
        update({
            gender: value
        })
    }

    function verifyInput(values) {
        setIsInputsValid (dateError.type == 'valid' && nicknameError.type == 'valid');
        return 
        let { birthDay, name } = values;
        if (birthDay.length == 10 && name.length > 3) {
            setIsInputsValid(true);
        } else {
            setIsInputsValid(false);
        }
    }

    function goNextPage() {
        navigation.navigate('Create Account')
    }

    function testNickname(state, error) {
        var newError = {...error.value};
        
        try {
            nickname(state);

            newError.type = 'valid';
            newError.message = '';
            error.setError(newError);
        } catch (err) {
            newError.type = 'error';
            newError.message = err;
        }
        error.setError(newError);
    }

    return (
        <View style={[pageView.spaceBt, {}]}>
            <View style={styles.inputs}>
                <Title size={2}>About you</Title>
                <RegularInput 
                    state={name} 
                    onChangeText={updateName}
                    label='Name'
                    error={{
                        value: nicknameError,
                        setError: setNicknameError,
                        test: testNickname
                    }}
                />
                <DateInput 
                    label='Birthday'
                    state={birthDay} 
                    onChangeText={updateBirthDay}
                    error={{
                        value: dateError,
                        setError: setDateError
                    }}
                />
                <ChoiceInput 
                    label='Gender'
                    state={gender} 
                    onChangeText={updateGender}
                    options={{
                        choice: {
                            title: 'Select your gender',
                            choices: [{
                                value: 'Male',
                                image: <GenderMale width={24} height={24}/>
                            },{
                                value: 'Female',
                                image: <GenderFemale width={24} height={24}/>
                            },{
                                value: 'Other',
                                image: <GenderOther width={24} height={24}/>
                            }]
                        }
                    }}
                />
            </View>
            <RegularButtonLink 
                options={{
                    onPress: goNextPage
                }}
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
