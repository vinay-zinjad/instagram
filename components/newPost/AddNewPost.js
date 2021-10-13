import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "react-native-vector-icons"
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = () => {
    return (
        <View style={styles.container}>
            <Header />
            <FormikPostUploader />
        </View>
    )
}
const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
            <Text></Text>
        </View>

    )
}
export default AddNewPost

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        marginRight: 25.5,
    }
})
