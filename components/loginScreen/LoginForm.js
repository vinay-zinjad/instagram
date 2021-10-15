import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, Alert, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Formik } from "formik"
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase } from "../../firebase"
import { useNavigation } from '@react-navigation/core'
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string()
            .required()
            .min(6, "Your password must have at list 8 characters ")
    })
    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("Firebase login successful", email, password)
        } catch (error) {
            Alert.alert(
                "Invalid Password",
                error.message + "\n\n Would you like to go to sign up screen?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Ok"),
                        style: "cancel",
                    },
                    {
                        text: "Sign Up",
                        onPress: () => navigation.push('SignupScreen'),
                        style: "default"
                    }
                ]
            )
        }
    }
    const navigation = useNavigation()
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: "" }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={[styles.inputField, {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "red"
                        }]}>

                            <TextInput
                                placeholderTextColor="#444"
                                placeholder="email"
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
                        <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
                            <Text style={{ color: "#6bb0f5" }}>Forgot password?</Text>
                        </View>
                        <Pressable
                            onPress={handleSubmit}
                            titleSize={20}
                            style={styles.button(isValid)}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{ color: "#6bb0f5" }}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                }
            </Formik >
        </View >
    )
}

export default LoginForm

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
