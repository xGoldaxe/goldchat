import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text, Pressable, Keyboard } from 'react-native'

export default function StyledInput({ state, onChangeText, label = '', options, inputComponent, error = null }) {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef(null);
    const [borderColor, setBorderColor] = useState('white')

    //to set unfocus of input without textinput
    useEffect(() => {
        var keyboardDidShow;
        if (inputRef.current == null) {
            keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
                setFocus(false);
            })
        }
        return (() => {
            if (inputRef.current == null) {
                keyboardDidShow.remove()
            }
        });
    }, [])

    function useFocus() {
        if (inputRef.current) {
            inputRef.current.focus();
        } else {
            Keyboard.dismiss();
        }
        setFocus(true);
    }

    useEffect(() => {
        if (error && error.value.type == 'error') {
            setBorderColor('red');
        } else if (error && error.value.type == 'valid') {
            setBorderColor('green');
        } else if (focus) {
            setBorderColor('black');
        } else {
            setBorderColor('white');
        }
    }, [focus, error])

    return (
        <View style={styles.view}>
            <Pressable 
                style={[styles.inputContainer, {
                    backgroundColor: borderColor
                }]}
                onPress={useFocus}
            >
                {(!focus && state.length == 0 && error.value.type == 'neutral')&& 
                    <View style={styles.emptyInput}>
                        <Text style={styles.emptyInputText}>{label}</Text>
                    </View>
                }
                <View style={[styles.insineInput, {
                    borderColor: borderColor,
                }]}>
                    <Text style={styles.label}>{label}</Text>
                    {inputComponent({
                        state: state,
                        onChangeText: onChangeText,
                        options: options,
                        inputRef: inputRef,
                        setFocus: setFocus,
                        focus: focus,
                        error: error
                    })}
                </View>
                {(error && error.value.type == 'error') && <Text style={styles.inputErrorMsg}>{error.value.message}</Text>}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        alignItems: 'center'
    },
    inputContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    insineInput: {
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 23,
        borderWidth: 3
    },
    emptyInput: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 2,
        justifyContent: 'center',
        paddingHorizontal: 17,
    },
    emptyInputText: {
        color: 'grey',
        fontSize: 23,
    },
    label: {
        fontSize: 13,
        color: 'grey'
    },
    inputErrorMsg: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        paddingBottom: 3
    }
})
