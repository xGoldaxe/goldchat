import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'

export default function RegularButtonLink({ title, loading = false, disabled = false, options }) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && {opacity: 0.6}]}
            {...options}
            disabled={disabled == true || loading == true}
        >
            {loading ? <ActivityIndicator size="large" color="white"/>
            :
            <Text style={styles.buttonText}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
})
