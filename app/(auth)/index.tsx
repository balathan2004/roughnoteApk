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
import { useReplyContext } from "@/src/components/context/reply_context";
import { serverUrl } from "@/constants/env";
import { styles } from "../../styles/auth.css";
import { useTheme } from "@react-navigation/native";
import { useLoginMutation } from "@/src/redux/api/authApi";
const image = require("../../assets/images/roughnote.png");

const Login: FC = () => {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const [userData, setUserData] = useState({
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
    if (userData.email && userData.password) {
      const res = await login(userData)
        .unwrap()
        .then((res) => {
          console.log({ res });
          router.push("/(tabs)");
        })
        .catch((err) => {
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
