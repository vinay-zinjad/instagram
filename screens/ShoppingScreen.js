import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

const ShoppingScreen = () => {
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
                source={require('../assets/animations/launch.json')}
            />
            <Text style={styles.header}>Shopping screen is not ready yet!</Text>
            <Text style={styles.text}>This section is under development.</Text>
        </View>
    )

}

export default ShoppingScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        color: 'white',
    },
    text: {
        color: 'gray',
        fontSize: 18,
    }
})