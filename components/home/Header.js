import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome, AntDesign } from "react-native-vector-icons"
import { firebase } from '../../firebase'
const Header = () => {
    const navigation = useNavigation()
    const handleSignout = async () => {
        try {

            await firebase.auth().signOut()
            console.log("signed out sucessfully")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignout} activeOpacity={0.8}>
                <Image style={styles.logo} source={require("../../assets/logo.png")} />
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('NewPostScreen')}>
                    <FontAwesome name='plus-square-o' size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name='hearto' size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>3</Text>
                    </View>
                    <AntDesign name='message1' size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 100,
        resizeMode: "contain"
    },
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
    },
    iconsContainer: {
        flexDirection: "row",
        width: 110,
        justifyContent: "space-between",
        alignItems: "center",
    },
    unreadBadge: {
        backgroundColor: "#ff3250",
        position: "absolute",
        left: 10,
        bottom: 16,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: "700"
    }

})
