import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { FontAwesome, Entypo, Ionicons } from 'react-native-vector-icons'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/posts'
import { Divider } from 'react-native-elements'
import { firebase, db } from '../firebase'
import { useNavigation, useRoute } from '@react-navigation/core'
import Post from '../components/home/Post'



const ProfileScreen = () => {
    const route = useRoute()
    const userUid = route?.params?.otherUserUid ? route.params.otherUserUid : firebase.auth().ntUser
    const userEmail = route?.params?.userEmail ? route.params.userEmail : firebase.auth().ntUser.email
    const [ntLoggedInUser, setntLoggedInUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [ntPostToShow, setntPostToShow] = useState()

    const getUserInfo = (userUid) => {


        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', userUid.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc => {
                    setntLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profile_picture,
                    })
                })
            )
        return unsubscribe
    }
    const getUserPosts = () => {

        const unsubscribe = db.collection('users').doc(userEmail).collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return unsubscribe
    }
    useEffect(() => {
        getUserInfo(userUid)
        getUserPosts(userEmail)
    }, [])
    if (!ntLoggedInUser) {
        return <Text>No nt user</Text>
    }
    return (
        <View style={styles.container}>

            <ProfileHeader username={ntLoggedInUser?.username} userEmail={userEmail} />
            <Divider width={1} color="#242424" orientation="horizontal" />
            <ScrollView style={styles.container}>

                <ProfileRow profilePicture={ntLoggedInUser.profilePicture} posts={posts} />
                <ProfileBio name={firebase.auth().ntUser.email} />
                <ButtonsRow />
                <View style={styles.stories}>
                    <Stories />
                </View>
                <Feed
                    posts={posts}
                    setModalVisible={setModalVisible}
                    setntPostToShow={setntPostToShow}
                />
                <PostModal
                    post={ntPostToShow}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible} setntPostToShow={setntPostToShow} ntPostToShow={ntPostToShow} />
            </ScrollView>
        </View>
    )
}

const ProfileHeader = ({ username, userEmail }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.headerContainer}>
            {userEmail !== firebase.auth().ntUser.email && <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>}
            <Text numberOfLines={1} style={styles.username}>{username}</Text>
            <View style={styles.headerIconsContainer}>
                <FontAwesome name={"plus-square-o"} size={32} color="white" />
                <Entypo name={"menu"} size={32} color="white" />
            </View>
        </View>
    )
}

const ProfileRow = ({ profilePicture, posts }) => {
    return (
        <View style={styles.profileRowContainer}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            <View style={styles.infoContainerMain}>
                <View style={styles.infoContainer}>
                    <Text style={styles.number}>{posts.length}</Text>
                    <Text style={styles.text}>Posts</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.number}>200</Text>
                    <Text style={styles.text}>Followers</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.number}>203</Text>
                    <Text style={styles.text}>Following</Text>
                </View>
            </View>
        </View>
    )
}

const ProfileBio = ({ name }) => {
    return (
        <View style={styles.bioContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text numberOfLines={3} style={styles.bio}>{
                'Photography is passion! \nFuture programmer by education \n5 Aug'
            }
            </Text>
        </View>
    )
}

const ButtonsRow = () => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ad Tools</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Insights</Text>
            </TouchableOpacity>
        </View>
    )
}

export const Feed = ({ posts, setModalVisible, ntPostToShow, setntPostToShow }) => {
    const navigation = useNavigation()
    const { height, width } = useWindowDimensions()
    return (<View style={styles.feedContainer}>
        <View style={styles.feedIcons}>

        </View>
        <View style={styles.feedImages}>
            {
                posts.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true)
                            setntPostToShow(item)
                            console.log(item)
                        }} key={index}>
                        <Image source={{ uri: item.imageUrl }} style={{ height: width / 3.1, width: width / 3.1, margin: 2 }} />
                    </TouchableOpacity>
                ))
            }

        </View>
    </View >)
}

const PostModal = ({ post, modalVisible, setModalVisible }) => {

    return (

        <Modal
            animationType="slide"
            transparent={false}
            presentationStyle="fullScreen"
            visible={modalVisible}
            onRequestClose={() => {

                setModalVisible(!modalVisible)
            }}
        >
            <View style={styles.modalContainer}>
                <Post
                    post={post}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    formModal={true}
                />
            </View>
            <Pressable  ></Pressable>

        </Modal>
    )
}
export default ProfileScreen

const styles = StyleSheet.create({

    container: {
        backgroundColor: "black",
        flex: 1,
    },
    //header styles
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: "gray",
    },
    headerIconsContainer: {
        flexDirection: "row",
        width: 75,
        justifyContent: "space-between"

    },
    username: {
        color: 'white',
        fontWeight: "700",
        fontSize: 24,
        maxWidth: "70%"
    },
    //Profile Row styles
    profileRowContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        color: 'white',
        flexDirection: "row",

    },
    profileImage: {
        height: 100,
        marginLeft: 10,
        marginRight: 20,

        width: 100,
        borderRadius: 50
    },
    number: {
        color: 'white',
        fontSize: 19,
        fontWeight: "700",
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
    infoContainerMain: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 10,
    },
    infoContainer: {
        alignItems: "center",
        justifyContent: "center"
    },

    //Bio style
    bioContainer: {
        marginLeft: 20,
        marginTop: 10
    },
    name: {
        fontSize: 17,
        color: 'white',
    },
    bio: {
        marginTop: 2,
        color: 'white',
        fontSize: 14,
        lineHeight: 18.8
    },
    //buttons row
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 35
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        width: "31%",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "gray"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

    //stories
    stories: {
        marginTop: 30,
        marginLeft: 10
    },
    // feed
    feedContainer: {},
    feedIcons: {},
    feedImages: {
        // justifyContent: "space-between",
        flexWrap: 'wrap',
        flexDirection: "row",
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "black"
    }

})
