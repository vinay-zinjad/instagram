import { Formik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Feather, MaterialIcons } from 'react-native-vector-icons'
import { db, firebase } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import validUrl from 'valid-url'


const EditProfileScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>

                <FormikForm />
            </ScrollView>

        </KeyboardAvoidingView>
    )
}


const FormikForm = () => {
    const [defaultInfo, setDefaultInfo] = useState()
    const [thumbnailUrl, setThumbnailUrl] = useState()


    const fetchDefaultInfo = async () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', user.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc => {
                    setDefaultInfo({
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
        fetchDefaultInfo()
    }, [])



    if (!defaultInfo) {
        return null
    }

    const uploadChangedData = async (email, owner_uid, name, username, imageUrl, website, bio) => {

        try {
            await db.collection('users').doc(email).set({
                email: email,
                name: name,
                owner_uid: owner_uid,
                username: username,
                profile_picture: imageUrl,
                website: website,
                bio: bio,
            })
            console.log("Succesfully updated profile imformation")
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }

    }

    const SignupFormSchema = Yup.object().shape({
        name: Yup.string().required().min(2, "A name is required"),
        username: Yup.string().required().min(2, "A username is required"),
        imageUrl: Yup.string().url().required("A URL is required"),
        website: Yup.string().url(),
        bio: Yup.string().max(1000, 'Bio has reached the character limit')
    })
    const navigation = useNavigation()
    return (

        <Formik
            initialValues={{ name: defaultInfo?.name, username: defaultInfo?.username, website: defaultInfo?.website, bio: defaultInfo?.bio, imageUrl: defaultInfo?.profilePicture }}
            onSubmit={(values) => {
                uploadChangedData(firebase.auth().currentUser.email, firebase.auth().currentUser.uid, values.name, values.username, values.imageUrl, values.website, values.bio)
            }}
            validationSchema={SignupFormSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                <>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="close" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "700", color: "white", fontSize: 24 }}>Edit Profile</Text>
                        <TouchableOpacity style={styles.button(isValid)} onPress={handleSubmit}>
                            <Feather name="check" size={35} style={styles.button(isValid)} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profilePictureContainer}>

                        <Image

                            source={{ uri: thumbnailUrl }}
                            style={styles.profilePicture}
                        />
                    </View>



                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.placeholder}>Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                value={values.name}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.placeholder}>Username</Text>

                            <TextInput
                                style={[styles.input, {
                                    borderBottomColor: 1 > values.username?.length || values.username?.length >= 2 ? "#ccc" : "#fd8183"
                                }]}
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                value={values.username}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.placeholder}>Profile URL</Text>

                            {errors.imageUrl && (
                                <Text style={{ fontSize: 12, color: "#fd8183" }}>{errors.imageUrl}</Text>
                            )}
                            <TextInput
                                style={[styles.input, {
                                    borderBottomColor: (errors.imageUrl) ? "#fd8183" : "#ccc"
                                }]}
                                onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                                onChangeText={handleChange("imageUrl")}
                                onBlur={handleBlur("imageUrl")}
                                value={values.imageUrl}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.placeholder}>Website</Text>

                            {
                                validUrl.isUri(values.website) && (
                                    <Text style={{ fontSize: 12, color: "#fd8183" }}>{errors.imageUrl}</Text>

                                )
                            }
                            <TextInput

                                style={[styles.input, {
                                    borderBottomColor: (errors.imageUrl) ? "#fd8183" : "#ccc"
                                }]}
                                onChangeText={handleChange("website")}
                                onBlur={handleBlur("website")}
                                value={values.website}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.placeholder}>Bio</Text>
                            <TextInput
                                style={[styles.input]}
                                multiline={true}
                                onChangeText={handleChange("bio")}
                                onBlur={handleBlur("bio")}
                                value={values.bio}
                            />
                        </View>

                    </View>


                </>
            )
            }
        </Formik >
    )
}
export default EditProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    profilePictureContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicture: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    //header styles
    headerContainer: {
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    //Form
    formContainer: { marginHorizontal: 20 },

    placeholder: {
        color: "gray",
    },
    inputContainer: {
        marginVertical: 10,
    },
    input: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 2
    },
    button: isValid => ({
        color: isValid ? "#0096f6" : "gray",
        alignItems: "center",
        minHeight: 42,
        borderRadius: 4,
        justifyContent: "center"
    }),
    buttonText: {
        fontWeight: "700",
        color: "white",
        fontSize: 20,
    },
})
