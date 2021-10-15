import React from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={styles.logo}>
                    <Image
                        source={require("../assets/instagramIcon.png")}
                        style={{ height: 100, width: 100 }} />
                </View>
                <LoginForm />
            </ScrollView>
        </KeyboardAvoidingView>
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
