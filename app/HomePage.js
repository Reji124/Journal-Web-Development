import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';








const HomePage = () => {








    const onPressCustom = () => {
        router.replace('/JournalList');
    };








    const onPressLogout = () => {
        router.replace('/');
    };








    return (
        <ImageBackground source={{ uri: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v546batch3-mynt-34-badgewatercolor_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=89288ef4b47127f7f34a5998b50e4470' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to your Journal</Text>
                    <TouchableOpacity onPress={onPressCustom} style={styles.customBtn}>
                        <Text style={styles.customText}>Create Journal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressLogout} style={styles.logoutBtn}>
                        <Text style={styles.logoutText}>Logout</Text>
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
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfd2c4'
    },


    title: {
        fontWeight: "bold",
        fontSize:50,
        fontStyle: "italic",
        color:"black",
    },


    customBtn: {
        width: 350,
        backgroundColor:"#D7C49EFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },






    logoutBtn: {
        width: 350,
        backgroundColor:"#343148FF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },




    customText: {
        color: 'white'
    },




    recipeText: {
        color: 'white'
    },






    logoutText: {
        color: 'white'
    },
});








export default HomePage;


