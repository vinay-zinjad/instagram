import React from 'react'
import { Pressable, StyleSheet, Text, Alert, TextInput, View } from 'react-native'
import { Formik } from "formik"
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import Validator from 'email-validator'

import { db, firebase } from '../../firebase'
import { useNavigation } from '@react-navigation/core'
const SignupForm = () => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        username: Yup.string().required().min(2, "A username is required"),
        password: Yup.string()
            .required()
            .min(6, "Your password must have at list 8 characters ")
    })

    const getRandomProfilePicture = async () => {
        const responce = await fetch("https://randomuser.me/api")
        const data = await responce.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log("Firebase user created successfully with", email, password)
            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
    }
    const navigation = useNavigation()
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: "" }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                    <>
                        <View style={[styles.inputField, {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "red"
                        }]}>

                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="Phone number, username or email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                autoFocus={true}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.inputField, {
                            borderColor: 1 > values.username.length || values.username.length >= 2 ? "#ccc" : "red"
                        }]}>

                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="Username"
                                autoCapitalize="none"
                                textContentType="username"
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                value={values.username}
                            />
                        </View>
                        <View style={[styles.inputField, {
                            borderColor: 1 > values.password.length || values.password.length >= 6 ? "#ccc" : "red"
                        }]}>

                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="Password"
                                autoCapitalize="none"
                                textContentType="password"
                                secureTextEntry={true}

                                onChangeText={handleChange("password")}
                                onChangeBlur={handleBlur("password")}
                                value={values.password}
                            />
                        </View>

                        <Pressable
                            onPress={handleSubmit}
                            titleSize={20}
                            style={styles.button(isValid)}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: "#6bb0f5" }}> Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                }
            </Formik >
        </View >
    )
}

export default SignupForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,

    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#fafafa",
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    button: isValid => ({
        backgroundColor: isValid ? "#0096f6" : "#9acaf7",
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
    signupContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        marginTop: 50,
    }
})

