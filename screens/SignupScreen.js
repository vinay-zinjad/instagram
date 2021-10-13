import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import SignupForm from '../components/signupScreen/SignupForm'

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require("../assets/instagramIcon.png")}
                    style={{ height: 100, width: 100 }} />
            </View>
            <SignupForm />
        </View>
    )
}

export default SignupScreen


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
