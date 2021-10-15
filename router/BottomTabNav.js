import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native';
import NewPostScreen from '../screens/NewPostScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import ReelsScreen from '../screens/ReelsScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { db, firebase } from '../firebase';

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    useEffect(() => {

        db.collection('users')
            .where('owner_uid', '==', firebase.auth().currentUser.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc => {
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profile_picture,
                        name: doc.data().name,
                        bio: doc.data().bio,
                        website: doc.data().website,
                    })
                })
            )
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                "tabBarActiveTintColor": "white",
                "tabBarInactiveTintColor": "#6e6e6e",
                "tabBarShowLabel": false,
                "headerShown": false,
                "tabBarStyle": [
                    {
                        "backgroundColor": "black",
                        "display": "flex",
                        "borderTopWidth": 0,
                        "elevation": 0,
                    },
                    null
                ]
            }}
        >
            <Tab.Screen
                component={HomeScreen}
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            (<Entypo name="home" color={color} size={25} />) : (<SimpleLineIcons name="home" color={color} size={25} />)

                    ),
                }}
            />
            <Tab.Screen
                component={SearchScreen}
                name="search"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "search" : "search-outline"} color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen
                component={ReelsScreen}
                name="reels"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <Image source={require('../assets/instagram-reels-active.png')} style={{ height: 24, width: 24 }} />
                            : <Image source={require('../assets/instagram-reels-inactive.png')} style={{ height: 24, width: 24 }} />

                    ),
                }}
            />
            <Tab.Screen
                component={ShoppingScreen}
                name="shopping"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? "shopping" : "shopping-outline"} color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen
                component={ProfileScreen}
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Image source={{ uri: currentLoggedInUser?.profilePicture }} style={{ height: 30, width: 30, borderRadius: 20, borderColor: "white", borderWidth: focused ? 2 : 0 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNav;
