import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Folkstone_Harbor_Port_image.jpg')} style={styles.image} resizeMode='fit' />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>Folk-stone, Harbor Port,</Text>
        <Text style={styles.cardBodyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#ffffff"
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 25,
    color: "green",
    fontWeight: "800"
  },
  cardBody: {
    marginHorizontal: 3
  },
  cardBodyText: {
    marginTop: 10,
    fontSize: 16
  }
})