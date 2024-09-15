import React from "react";


import { SafeAreaView} from "react-native";
import FirstApp from "./learningApps/FirstApp";



function App() {

    return(
        <SafeAreaView style={{flex: 1}}>
            <FirstApp />
        </SafeAreaView>
    )
}

export default App;