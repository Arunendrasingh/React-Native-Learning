import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const BlogCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>What's New in School's in 2024?</Text>
      </View>
      <Image source={require('../assets/images/school.jpg')} style={styles.image} />
      <View style={styles.cardBody}>
        {/* Provide one button for read more and one button for follow more */}
        <TouchableOpacity>
          <Text style={styles.link}>Read more...</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>follow me...</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default BlogCard

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff"
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  cardHeader: {
    paddingVertical: "5%",
    margin: "auto",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    color: "red"
  },
  cardBody: {
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cardBodyText: {
    marginTop: 10,
    fontSize: 16
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
})