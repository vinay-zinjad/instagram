import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Fontisto } from 'react-native-vector-icons'
import { db } from '../firebase'
import { Feed } from './ProfileScreen'

const SearchScreen = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Fontisto name={"search"} size={24} color="gray" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="gray"
                    style={styles.input}
                />
            </View>
            <Feed posts={posts} />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    inputContainer: {
        backgroundColor: "#262626",
        flexDirection: "row",
        padding: 10,
        borderColor: '#454545',
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 5,
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    input: {
        fontSize: 18,
        color: "white",
        paddingHorizontal: 20
    },
})
