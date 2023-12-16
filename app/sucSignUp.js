import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';








const App = () => {




    const onPressSignUp = () => {
        router.replace('/');
    };




    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/18/7e/5a/187e5a3eb8b372d01425ed6666f78620.jpg' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>You have registered successfully...</Text>




                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};




const styles = StyleSheet.create({
   
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },




    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },




    container: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfd2c4'
    },




    title: {
        fontWeight: "bold",
        fontSize:25,
        color:"black",
        marginBottom: 20,
    },




    signUpBtn: {
        width: 350,
        backgroundColor:"#D7C49EFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },




    signupText: {
        color: 'white'
    },




});




export default App;


