import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { FontAwesome, Entypo } from 'react-native-vector-icons'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/posts'
import { Divider } from 'react-native-elements'


const ProfileScreen = () => {

    return (
        <View style={styles.container}>

            <ProfileHeader />
            <Divider width={1} color="#242424" orientation="horizontal" />
            <ScrollView style={styles.container}>

                <ProfileRow />
                <ProfileBio />
                <ButtonsRow />
                <View style={styles.stories}>
                    <Stories />
                </View>
                <Feed />
            </ScrollView>
        </View>
    )
}

const ProfileHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text numberOfLines={1} style={styles.username}>vinay_zinjad</Text>
            <View style={styles.headerIconsContainer}>
                <FontAwesome name={"plus-square-o"} size={32} color="white" />
                <Entypo name={"menu"} size={32} color="white" />
            </View>
        </View>
    )
}

const ProfileRow = () => {
    return (
        <View style={styles.profileRowContainer}>
            <Image source={{ uri: 'https://source.unsplash.com/YUu9UAcOKZ4/900x900' }} style={styles.profileImage} />
            <View style={styles.infoContainerMain}>
                <View style={styles.infoContainer}>
                    <Text style={styles.number}>37</Text>
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

const ProfileBio = () => {
    return (
        <View style={styles.bioContainer}>
            <Text style={styles.name}>Vinay Zinjad</Text>
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

export const Feed = () => {
    const { height, width } = useWindowDimensions()
    return (<View style={styles.feedContainer}>
        <View style={styles.feedIcons}>

        </View>
        <View style={styles.feedImages}>
            {
                POSTS.map((item, index) => (
                    <Image key={index} source={{ uri: item.imageUrl }} style={{ height: width / 3.04, width: width / 3.04, marginBottom: 2 }} />
                ))
            }

        </View>
    </View>)
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
        justifyContent: "space-between",
        flexWrap: 'wrap',
        flexDirection: "row",
    },


})
