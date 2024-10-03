import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ElevatedCard = ({text}) => {
  return (
    <View style={styles.card}>
            <Text style={styles.cardText}>{text}</Text>
        </View>
  )
}

export default ElevatedCard

const styles = StyleSheet.create({
  card: {
      margin: 2,
      width: 100,
      height: 100,
      backgroundColor: "#CAD5E2",
  },
  cardText: {
      margin: "auto"
  }
})
