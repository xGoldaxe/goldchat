import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text, Pressable, Keyboard } from 'react-native'
import StyledInput from './StyledInput';
import verifyError from '../lib/verifyError';
import ChoiceModal from './ChoiceModal';

function ChoiceInputInput({ state, onChangeText, options, setFocus, focus, error }) {
    const { title, choices } = options.choice;
    
    function useFocus() {
        setFocus(true);
    }
    function blur() {
        setFocus(false);
    }

    function nativeErrorTest() {
        return (false);
    }

    function onEdit(value) {
        verifyErrorFunction(value);
        onChangeText(value);
    }

    const verifyErrorFunction = verifyError(nativeErrorTest, error);
    return (
        <>
            {focus && <ChoiceModal 
                setFocus={setFocus}
                title={title}
                choices={choices}
                onChoose={onChangeText}
            />}
            <Text
                style={[styles.input]}
                {...options}
            >
                {state}
            </Text>
        </>
    )
}

export default function ChoiceInput(props) {
    return (
        <StyledInput
            {...props}
            inputComponent={(props) => <ChoiceInputInput {...props} />}
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
