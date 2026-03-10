import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import HomeScreen from "../screens/home";

type Props = {};

const Stack = createNativeStackNavigator();

const Router = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth_stack">
        <Stack.Screen name="auth_stack" component={AuthStack} />
        <Stack.Screen name="home_stack" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
