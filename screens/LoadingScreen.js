import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <LottieView style={{
                height: 300,
                alignSelf: 'center',
                marginBottom: 30,
            }}
                autoPlay
                speed={1}
                loop={true}
                source={require('../assets/animations/loader.json')}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
    }
})
