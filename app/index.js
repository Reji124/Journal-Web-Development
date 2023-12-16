import React from 'react';
import { View } from 'react-native';
import LoginForm from '../components/loginForm';
import { SafeAreaProvider } from 'react-native-safe-area-context';




const Welcome = () => {
    return (
        <SafeAreaProvider>
          <View>
            <LoginForm />
          </View>
      </SafeAreaProvider>
 
        );
}




export default Welcome;
