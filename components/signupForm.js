import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase';


const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');


    useEffect(() => {
        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
                // Clear the password error when the email is valid
                setPasswordError('');
            }
        }


        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password must be between 8 to 20 characters');
            } else if (password !== confirmPassword) {
                setPasswordMessage("Passwords don't match");
            } else {
                setPasswordError('');
                setPasswordMessage('Passwords match');
                // You can perform sign-up logic here
            }
        }
    }, [user, password, confirmPassword]);


    const auth = getAuth(app);


    const onPressSignUp = async () => {
        if (user !== '' && password !== '') {
            try {
                await createUserWithEmailAndPassword(auth, user, password);
                // Directly navigate to success page
                router.replace('/sucSignUp');
            } catch (error) {
                console.error('Signup error:', error.message);
                alert('Error signing up. Please try again.');
            }
        } else {
            alert('Incorrect email or password');
        }
    };


    const onPressLogin = () => {
        router.replace('/');
    };


    return (
        <ImageBackground
            source={{
                uri: 'https://marketplace.canva.com/EAFJebotzdY/1/0/1600w/canva-beige-floral-minimalist-linktree-background-Jr6vl3hxUDw.jpg',
            }}
            style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign up Here!</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter Email"
                            placeholderTextColor="black"
                            onChangeText={(text) => setUser(text)}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Enter Password"
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
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}


                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Confirm Password"
                            placeholderTextColor="black"
                            onChangeText={(text) => setConfirmPassword(text)}
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
                    {passwordMessage ? (
                        <Text style={passwordMessage === 'Passwords match' ? styles.successText : styles.errorText}>
                            {passwordMessage}
                        </Text>
                    ) : null}


                    <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Sign up</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={onPressLogin} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>Login Existing Account</Text>
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


    toggleButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        zIndex: 1,
    },
    toggleButtonText: {
        color: 'black',
        fontSize: 10,
    },


    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },


    container: {
        borderWidth: 3,
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfd2c4'
    },


    title: {
        fontWeight: "bold",
        fontSize:50,
        color:"black",
        marginBottom: 40,
    },


    inputView: {
        width: 350,
        backgroundColor:"#ECE5DD",
        borderRadius:25,
        height:50,
        marginTop:10,
        marginBottom:10,
        justifyContent:"center",
        padding:20
    },


    inputText: {
        height:50,
        color:"black"
    },


    forgotAndSignUpText: {
        marginTop:10,
        color:"black",
        fontSize:11
    },


    loginBtn: {
        width: 350,
        backgroundColor:"#D7C49EFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },


    signUpBtn: {
        width: 350,
        backgroundColor:"#343148FF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
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


    successText: {
        color: 'blue',
        fontSize: 12,
    },


});


export default SignUp;
