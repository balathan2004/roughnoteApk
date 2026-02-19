import React, { FC, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
  Image,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { storeData } from "@/src/components/credStore";
import { styles } from "../../styles/auth.css";
import { useTheme } from "@react-navigation/native";
import { useLoginMutation } from "@/src/redux/api/authApi";
import CustomToast from "@/src/components/elements/CustomToast";
const image = require("../../assets/images/roughnote.png");

const Login: FC = () => {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const [user, setUserData] = useState({
    email: "",
    password: "",
  });

  const { colors } = useTheme();

  const resetState = () => {
    setUserData({ email: "", password: "" });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetState(); // Reset state when screen is unfocused
      };
    }, []),
  );

  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;

      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue.trim(),
      }));
    };

  const submitForm = async () => {
    if (user.email && user.password) {
      const res = await login(user)
        .unwrap()
        .then((res) => {
        
          CustomToast(res.message);
          router.push("/(tabs)");
        })
        .catch((err) => {
          CustomToast(err.data.message || "Login failed");
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.auth_container}>
      <View style={styles.inner_container}>
        <Image source={image}></Image>
        <Text style={[styles.title, { color: colors.text }]}>Login Here</Text>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter email
          </Text>
          <TextInput
            onChange={handleInput("email")}
            placeholder="Enter email"
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            autoCapitalize="none" // To prevent auto-capitalization
          />
        </View>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter password
          </Text>
          <TextInput
            onChange={handleInput("password")}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            placeholder="Enter password"
            autoCapitalize="none" // To prevent auto-capitalization
          />
        </View>
        <Pressable
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <Text style={[styles.forget_password, { color: colors.text }]}>
            Create new account
          </Text>
        </Pressable>

        <View style={styles.button}>
          <Button
            title={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
            onPress={submitForm}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
