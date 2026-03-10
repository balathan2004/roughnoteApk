import React, { useEffect } from "react";
import { User } from "@/src/components/interfaces";
import { Image, View } from "react-native";
import { styles } from "@/styles/global.css";
const image = require("./assets/images/roughnote.png");
import { getData } from "@/src/components/credStore";
import { useAuth } from "@/src/redux/api/authSlice";

export default function Index() {
  const { addUser } = useAuth();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userCred = (await getData("user")) as User;

        setTimeout(() => {
          if (userCred) {
            addUser(userCred);
            // router.replace("/(tabs)"); // Navigate to tabs if logged in
          } else {
            // router.replace("/(auth)"); // Navigate to auth if not logged in
          }
        }, 500);
      } catch (err) {
        console.log("error is", err);
      }
    };
    checkUserLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={image} />
    </View>
  );
}
