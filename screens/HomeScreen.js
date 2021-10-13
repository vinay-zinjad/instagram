import React, { useEffect, useState } from 'react'
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/posts'
import { db } from '../firebase'

const HomeScreen = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Header />
            <FlatList
                ListHeaderComponent={() => <Stories />}
                data={posts}
                renderItem={({ item }) => <Post post={item} />}
            />

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
})
