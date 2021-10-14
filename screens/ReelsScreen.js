import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'


const ReelsScreen = () => {
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
                source={require('../assets/animations/underConstruction.json')}
            />
            <Text style={styles.header}>Reels are not ready yet!</Text>
            <Text style={styles.text}>This section is under development.</Text>
        </View>
    )
}

export default ReelsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    header: {
        fontSize: 30,
        color: 'white',
    },
    text: {
        color: 'gray',
        fontSize: 18,
    }
})
