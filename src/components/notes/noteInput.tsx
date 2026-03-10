import { View, Text, TextInput, TextStyle } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

type Props = {
  style: TextStyle;
  value: string;
  onChangeText: (text: string) => void;
  charLimit: number;
};

const NoteInput = ({ onChangeText, value, style, charLimit }: Props) => {
  const [height, setHeight] = React.useState(0);

  const { colors } = useTheme();

  return (
    <View>
      <TextInput
        onContentSizeChange={(event) =>
          setHeight(event.nativeEvent.contentSize.height)
        }
        style={[style, { height: Math.max(50, height) }]}
        multiline
        value={value}
        onChangeText={onChangeText}
      ></TextInput>
      <Text style={[, { color: colors.text }]}>
        {value.length}/{charLimit} chars
      </Text>
    </View>
  );
};

export default NoteInput;
