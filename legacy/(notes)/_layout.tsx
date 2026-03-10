
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function NotesLayout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: true,
        headerTitle: "User Profile",
        BarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "none",
        },
        headerLeft: () => {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.colors.text}
              onPress={() => router.back()} // Handle back action
              style={{ marginLeft: 10, marginRight: 20 }} // Add some margin to the left
            />
          );
        },
      })}
    ></Tabs>
  );
}
