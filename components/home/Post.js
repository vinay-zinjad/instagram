import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo, Fontisto, Feather, AntDesign, Ionicons } from 'react-native-vector-icons'
import { db, firebase } from '../../firebase'

const Post = ({ post, formModal = false, setModalVisible, modalVisible }) => {
    if (!post) {
        return <></>;
    }

    const [postOwnerData, setPostOwnerData] = useState()


    //fetching data again because post username and prifilepicture does not update wen user edit profile info
    const fetchPostOwnerData = async () => {

        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', post.owner_uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc => {
                    setPostOwnerData({
                        name: doc?.data()?.name,
                        username: doc?.data()?.username,
                        profilePicture: doc.data()?.profile_picture,
                        website: doc?.data()?.website,
                        email: doc?.data()?.email,
                        owner_uid: doc?.data()?.owner_uid,
                        bio: doc?.data()?.bio,

                    })

                })
            )

        return unsubscribe
    }
    useEffect(() => {
        fetchPostOwnerData()
    }, [])
    if (!postOwnerData) {
        return <></>;
    }
    const handleLike = post => {
        const currentLikeStatus = !post?.likes_by_users.includes(
            firebase.auth().currentUser.email
        )
        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentLikeStatus
                    ? firebase.firestore.FieldValue.arrayUnion(
                        firebase.auth().currentUser.email
                    )
                    : firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    ),
            }).then(() => {
                console.log("Current user added to likes_by_users array")
            })
            .catch(e => {
                console.log("Error", e)
            })
    }
    return (
        <View>
            <PostHeader post={post} postOwnerData={postOwnerData} formModal={formModal} setModalVisible={setModalVisible} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
            </View>
        </View>
    )
}

const PostHeader = ({ post, postOwnerData, formModal, setModalVisible }) => {

    const navigation = useNavigation()
    return (
        <View style={styles.postHeaderContainer}>
            <View style={styles.goBackButtonContainer}>

                {formModal && <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="chevron-back" size={30} color="white" style={styles.goBackButton} />
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen", {
                    otherUserUid:
                    {
                        uid: post.owner_uid,
                    },
                    userEmail: post.owner_email
                }
                )} style={styles.PostHeaderUserContainer}>
                    <Image style={styles.profilePicture} source={{ uri: postOwnerData.profilePicture }} />
                    <Text style={styles.userName}>{postOwnerData.username}</Text>
                </TouchableOpacity>
            </View>
            <Entypo name="dots-three-vertical" color="gray" size={20} />
        </View>
    )
}
const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450 }}>

        <Image
            source={{ uri: post.imageUrl }}
            style={styles.postImage}
        />
    </View>
)

const PostFooter = ({ handleLike, post }) => (
    <View>
        <View style={styles.iconsContainer}>

            <View style={styles.leftFooterIconsContainer}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    {
                        post.likes_by_users.includes(firebase.auth().currentUser.email) ?
                            <AntDesign name='heart' size={28} color="#fb3958" /> :
                            <AntDesign name='hearto' size={28} color="white" />
                    }
                </TouchableOpacity>
                <TouchableOpacity>
                    <Fontisto name="comment" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="send" size={28} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Feather name="bookmark" size={28} color="white" />
            </TouchableOpacity>

        </View>
        <Text style={styles.likestext}>{post?.likes_by_users?.length.toLocaleString('en') || 0} {post?.likes_by_users?.length === 1 ? "like" : "likes"}</Text>
        {/* caption */}
        <Text numberOfLines={2} >
            <Text style={styles.likestext}>{post?.user}</Text>

            <Text style={styles.caption}>  {post?.caption}</Text>
        </Text>
        <CommentSection post={post} />
        <Comments post={post} />
    </View>
)


const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post?.comments?.length && (<Text style={{ color: "gray" }}>
            View {post?.comments?.length > 1 && "all "}{post?.comments?.length}{" "}
            {post?.comments?.length > 1 ? 'comments' : 'comment'}
        </Text>)}
    </View>
)

const Comments = ({ post }) => (
    <>
        {post?.comments?.map((comment, index) => (
            <View style={{ flexDirection: "row", marginTop: 5 }} key={index}>
                <Text style={{ color: "white" }}>
                    <Text style={{ fontWeight: "700" }}>{comment.user} </Text>
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)
export default Post

const styles = StyleSheet.create({
    postHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 8,
        alignItems: "center"
    },
    PostHeaderUserContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    profilePicture: {
        height: 35,
        width: 35,
        borderRadius: 25,
        borderColor: "#ff8501",
        borderWidth: 1.7
    },
    userName: {
        color: "white",
        marginLeft: 5,
        fontWeight: '700',
    },
    postImage: {
        height: "100%",
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leftFooterIconsContainer: {
        flexDirection: "row",
        width: 120,
        justifyContent: "space-between"
    },
    likestext: {
        color: "white",
        fontWeight: "700",
        marginTop: 6
    },
    caption: {
        color: "white"
    },
    goBackButtonContainer: {
        flexDirection: "row",
    },
    goBackButton: {
        marginRight: 20,
    }
})
