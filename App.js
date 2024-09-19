import React from 'react';


import { SafeAreaView} from 'react-native';
import PasswordGenerator from './learningApps/PasswordGenerator';



function App() {

    return(
        <SafeAreaView style={{flex: 1}}>
            <PasswordGenerator />
        </SafeAreaView>
    )
}

export default App;
