import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost />
        </SafeAreaView>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    }
})
