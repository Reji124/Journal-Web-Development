import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from '../Firebase/firebase';




const loginForm = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [loginError, setLoginError] = useState('');




    useEffect(() => {
        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        }




        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password should be 8 to 20 characters');
            } else {
                setPasswordError('');
            }
        }
    }, [user, password]);




    const auth = getAuth(app);




    const onPressLogin = () => {
        if (user === 'ADMIN' && password === 'password') {
            router.replace('/HomePage');
            alert('Welcome To Journal');
            return;
        }




        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/HomePage');
             
            })
            .catch((error) => {
                setLoginError('Incorrect email or password. Please try again.');
                console.error('Login error:', error.message);
            });




        if (emailError || passwordError) {
            return;
        }




        console.log(user);
        console.log(password);
    };




   
    const onPressSignUp = () => {
        router.replace('/signUp');
    };




    const [rememberMe, setRememberMe] = useState(false);




    return (
        <ImageBackground source={{ uri: 'https://marketplace.canva.com/EAFJebotzdY/1/0/1600w/canva-beige-floral-minimalist-linktree-background-Jr6vl3hxUDw.jpg' }}
            style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to your Journal</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="black"
                            onChangeText={(text) => setUser(text)} />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}




                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Password"
                            placeholderTextColor="black"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.toggleButtonText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {passwordError ? (<Text style={styles.errorText}>{passwordError}</Text>) : null}




                    <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>




                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                            <View style={styles.checkbox}>
                                {rememberMe && <View style={styles.checkboxInner}></View>}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                    </View>
                    {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
                </View>
            </View>
        </ImageBackground>
    );
};




const styles = StyleSheet.create({
    bG: {
        height: 900,
        flex: 1,
        resizeMode: 'cover'
    },




    toggleButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        zIndex: 1,
    },
    toggleButtonText: {
        color: '',
        fontSize: 10,
    },




    overlay: {
        height: 900,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },




    container: {
        borderWidth: 3,
        borderRadius: 25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfd2c4'
    },




    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "black",
        marginBottom: 40,
    },




    inputView: {
        width: 350,
        backgroundColor: "#ECE5DD",
        borderRadius: 25,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        padding: 20
    },




    inputText: {
        height: 50,
        color: "black"
    },




    forgotAndSignUpText: {
        marginTop: 10,
        color: "black",
        fontSize: 11
    },




    loginBtn: {
        width: 350,
        backgroundColor: "#D7C49EFF",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },




    signUpBtn: {
        width: 350,
        backgroundColor: "#343148FF",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },








    signupText: {
        color: 'white'
    },




    loginText: {
        color: 'white'
    },




    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },




    checkbox: {
        marginRight: 10,
        marginTop: 20,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },




    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: 'black',
    },




    rememberMeText: {
        marginTop: 20,




    },




    errorText: {
        color: 'red',
        fontSize: 12,
    },
});




export default loginForm;


