import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import StyledInput from './StyledInput';
import isNumber from '../lib/isNumber';
import verifyError from '../lib/verifyError';
import { verifyDateAge, verifyDateEmpty, verifyDateFull } from '../lib/date/verifyDate';

function DateInputInput({ state, onChangeText, options, inputRef, setFocus, error }) {
    const mounthRef = useRef(null);
    const yearRef = useRef(null);

    useEffect(() => {
        if (!verifyDateEmpty(state)) {
            verifyErrorFunction(state);
        }
    }, []);

    function nativeErrorTest(state, error = null) {
        const { day, mounth, year } = state;
        var newError = {...error.value};

        try {
            verifyDateAge({ day, mounth, year }, 13);
            if (verifyDateFull({ day , mounth, year })) {
                newError.type = 'valid';
            } else {
                newError.type = 'neutral';
            }
            newError.message = '';
        }
        catch (err) {
            newError.type = 'error';
            newError.message = err;
        }
        error.setError(newError);
    }

    const verifyErrorFunction = verifyError(nativeErrorTest, error);

    function edit(value, key, size, previousRef, nextRef = null) {
        if (!isNumber(value)) {
            return ;
        }
        if (value.length <= size) {
            var newState = {...state};
            newState[key] = value;
            verifyErrorFunction(newState);
            onChangeText(newState);
        }
        if ( nextRef && value.length == 2 ) {
            nextRef.current.focus();
        }
        if ( previousRef && value.length == 0 ) {
            previousRef.current.focus();
        }
    }

    function editDay(value) {
        edit(value, 'day', 2, null, mounthRef);
    }

    function editMounth(value) {
        edit(value, 'mounth', 2, inputRef, yearRef);
    }

    function editYear(value) {
        edit(value, 'year', 4, mounthRef);
    }

    function newSwap() {
        if (
            inputRef.current.isFocused() == false &&
            mounthRef.current.isFocused() == false  &&
            yearRef.current.isFocused() == false
        ) {
            setFocus(false);
        } else {
            setFocus(true);
        }
    }

    const sharedProps = {
        style: [styles.input],
        onFocus: newSwap,
        onBlur: newSwap,
        keyboardType: 'numeric',
        ...options,
    }

    return (
        <View style={styles.flexDirection}>
            <TextInput
                onChangeText={editDay}
                value={state.day}
                maxLength={2}
                ref={inputRef}
                placeholder='DD'
                {...sharedProps}
            />  
            <Text style={[styles.input, styles.slash]}>/</Text>       
            <TextInput
                onChangeText={editMounth}
                value={state.mounth}
                maxLength={2}
                ref={mounthRef}
                placeholder='MM'
                {...sharedProps}
            />
            <Text style={[styles.input, styles.slash]}>/</Text>       
            <TextInput
                onChangeText={editYear}
                value={state.year}
                maxLength={4}
                ref={yearRef}
                placeholder='YYYY'
                {...sharedProps}
            />      
        </View>
    )
}

export default function DateInput(props) {
    return (
        <StyledInput
            {...props}
            inputComponent={(props) => <DateInputInput {...props} />}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 23,
        marginBottom: 3,
        padding: 0,
        textAlign: 'center'
    },
    slash: {
        marginHorizontal: 2
    },
    flexDirection: {
        flexDirection: 'row'
    }
})
