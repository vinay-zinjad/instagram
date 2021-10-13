import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require("../assets/instagramIcon.png")}
                    style={{ height: 100, width: 100 }} />
            </View>
            <LoginForm />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logo: {
        alignItems: "center",
        marginTop: 60

    }
})
