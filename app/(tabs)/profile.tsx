import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/profile.css";
import React, { useEffect, useState } from "react";
const image = require("@/assets/images/gewn.png");
import { View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { Button } from "react-native-paper";
import { getData } from "@/src/components/credStore"
import { useAuth } from "@/src/redux/api/authSlice";

const timerSetter = (message: string, time: number) => {
  return `${message} ${formatDistanceToNow(new Date(time), {
    addSuffix: true,
  })}`;
};

export default function Profile() {
  const { colors } = useTheme();

  const { userData } = useAuth();

  const [data, setData] = useState<any>();

  useEffect(() => {
    const get = async () => {
      const newData = await getData("doc_data");
      setData(newData);
    };
    get();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.home_container}>
        <View style={styles.card}>
          <Text style={[styles.centerText, { color: colors.text }]}>
            Your Profile
          </Text>

          <View style={styles.img_container}>
            <Image style={styles.profile_avatar} source={image} />
            <Text style={[styles.label, { color: colors.text }]}>
              {userData?.display_name}
            </Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>
            {userData?.email}
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>
            {timerSetter("Joined", userData?.createdAt || 0)}{" "}
          </Text>
          <View>
            <Button style={styles.button} mode="elevated">
              LogOut
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
