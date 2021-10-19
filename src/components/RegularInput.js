import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native'
import StyledInput from './StyledInput';
import verifyError from '../lib/verifyError';

function RegularInputInput({ state, onChangeText, options, inputRef, setFocus, error }) {
    useEffect(() => {
        if (state.length > 0) {
            verifyErrorFunction(state);
        }
    }, []);

    function focus() {
        setFocus(true);
    }
    function blur() {
        setFocus(false);
    }

    function onEdit(value) {
        verifyErrorFunction(value);
        onChangeText(value);
    }

    function nativeErrorTest() {
        return (false);
    }

    const verifyErrorFunction = verifyError(nativeErrorTest, error);

    return (
        <TextInput
            style={[styles.input]}
            onChangeText={onEdit}
            value={state}
            onFocus={focus}
            onBlur={blur}
            ref={inputRef}
            {...options}
        />
    )
}

export default function RegularInput(props) {
    return (
        <StyledInput
            {...props}
            inputComponent={(props) => <RegularInputInput {...props} />}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 23,
        marginBottom: 3,
        padding: 0
    }
})
