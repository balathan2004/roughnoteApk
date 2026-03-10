import React, { FC } from "react";
import { Doc } from "../interfaces";
import { View, Text, Pressable } from "react-native";
import { styles } from "@/styles/home.css";
import { useTheme } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

interface Props {
  data: Doc;
}

const truncateText = (text: string, length = 30) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const HoverCard: FC<Props> = ({ data }) => {

  const router = useRoute();
  
  const { colors } = useTheme();

  const redirectToNote = () => {
    router.push(`/(notes)?doc_id=${data.doc_id}`);
  };

  return (
    <Pressable style={styles.card} onPress={redirectToNote}>
      <Text style={[styles.card_docname, { color: colors.text }]}>
        {truncateText(data.doc_name, 20)}
      </Text>
      <View style={styles.hr}></View>
      <Text style={[styles.card_doctext, { color: colors.text }]}>
        {truncateText(data.doc_text, 50)}
      </Text>
    </Pressable>
  );
};

export default HoverCard;
