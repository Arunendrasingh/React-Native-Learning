import React from "react";


import { ScrollView, StyleSheet, Text, View } from "react-native";
import FlatCard from "./components/FlatCard";
import ElevatedCard from "./components/ElevatedCard";
import BlogCard from "./components/BlogCard";
import Card from "./components/Card";



function App() {

    return <View style={styles.container}>
        {/* FlatCards */}
        <View style={styles.flatCardContainer}>
            <Text style={styles.textStyle}>FlatCards🗑️🗑️</Text>
            <View style={styles.flatCards}>
                <FlatCard />
                <FlatCard cardStyle={{ backgroundColor: "green" }} />
                <FlatCard cardStyle={{ backgroundColor: "blue" }} />
            </View>
        </View>

        {/* Elevated cards */}
        <View style={styles.flatCardContainer}>
            <Text style={styles.textStyle}>Elevated Cards 🧳🧳</Text>
            <ScrollView horizontal >
                <ElevatedCard text="Tap" />
                <ElevatedCard text="me" />
                <ElevatedCard text="to" />
                <ElevatedCard text="scroll" />
                <ElevatedCard text="to" />
                <ElevatedCard text="left" />
                <ElevatedCard text="🧳🤣🤣" />
                <ElevatedCard text="😕😕" />
                <ElevatedCard text="🤑🤑🤑" />
                <ElevatedCard text="❌❌❌" />
            </ScrollView>
        </View>


        {/* Card View */}
        <View style={{marginVertical: 10}}>
            <Text style={styles.textStyle}>Trending View</Text>
            <Card />
        </View>

    </View >
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101516",
        flex: 1
    },
    flatCards: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    flatCardContainer: {
        margin: 2
    },
    textStyle: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    }
})


export default App;