import { Text, StyleSheet, View } from 'react-native'
import React from 'react'


function FlatCard({cardStyle})  {
    return (
        <View style={[styles.card, cardStyle]}>
            <Text style={styles.cardText}>FlatCard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
        backgroundColor: "red",
    },
    cardText: {
        margin: "auto"
    }
})


export default FlatCard