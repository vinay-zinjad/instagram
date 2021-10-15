import { useState } from "react"
import { db, firebase } from "./firebase"


export const signOut = async () => {
    try {
        await firebase.auth().signOut()
        console.log("signed out sucessfully")
    } catch (error) {
        console.log(error)
    }
}

