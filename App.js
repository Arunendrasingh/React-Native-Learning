import React from "react";


import { StyleSheet, Text, View } from "react-native";
import FlatCard from "./components/FlatCard";
import ElevatedCard from "./components/ElevatedCard";



function App() {

    return <View style={styles.container}>
        <View style={styles.flatCardContainer}>
            <FlatCard />
            <FlatCard cardStyle={{backgroundColor: "green"}}/>
            <FlatCard cardStyle={{backgroundColor: "blue"}} />
        </View>
        <ElevatedCard />
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101516",
        flex: 1
    },
    flatCardContainer: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})


export default App;