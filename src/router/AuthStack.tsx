import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/login";
import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";

const Stack = createNativeStackNavigator();
type Props = {};

const AuthStack = (props: Props) => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
