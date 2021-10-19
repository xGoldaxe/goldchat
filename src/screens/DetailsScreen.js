import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function DetailsScreen({ route, navigation }) {
    const { itemId, otherParam } = route.params;

    return (
        <View style={styles.pageView}>
            <Text>Details screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details', {
                    itemId: Math.floor(Math.random() * 100)
                })}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home') }/>
            <Button
                title="Update the title"
                onPress={() => navigation.setOptions({ title: 'Updated!' })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})