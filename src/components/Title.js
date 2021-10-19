import React, { Children } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Title({ children, size }) {
    return (
        <Text style={[{...styles.title}, {...styles[size]}]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
    1: {
        fontSize: 50
    },
    2: {
        fontSize: 40
    },
    3: {
        fontSize: 30
    },
    4: {
        fontSize: 20
    },
    5: {
        fontSize: 10
    }
})
