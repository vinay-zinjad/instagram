
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import NewPostScreen from '../screens/NewPostScreen'
import BottomTabNav from './BottomTabNav';

const Stack = createStackNavigator();
export const SignedInStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeTab"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen component={BottomTabNav} name="HomeTab" />
                <Stack.Screen component={NewPostScreen} name="NewPostScreen" />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export const SignedOutStack = () => {
    return (
        <NavigationContainer
        >
            <Stack.Navigator
                initialRouteName="LoginScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen component={LoginScreen} name="LoginScreen" />
                <Stack.Screen component={SignupScreen} name="SignupScreen" />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

