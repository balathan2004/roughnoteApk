import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/notes.css";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Doc } from "@/src/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUpdateDocMutation } from "@/src/redux/api/docsApi";
import { useAuth } from "@/src/redux/api/authSlice";
import { getDB, updateDoc } from "@/src/db";
import NoteInput from "@/src/components/notes/noteInput";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const { colors } = useTheme();
  const route = useRoute()
  const { doc_id } = route.params;

  const [patchDoc, { isLoading }] = useUpdateDocMutation();

  const { docs } = useAuth();

  const titleLimit = 100;
  const descriptionLimit = 10000;

  const [currentDocData, setCurrentDocData] = useState<Doc | null>(null);
  const [isEditted, setIsEditted] = useState(false);
  const [caption, setCaption] = useState("");
  const [docName, setDocName] = useState("");
  const [nameInputHeight, setNameInputHeight] = useState(50);
  const [textInputHeight, setTextInputHeight] = useState(50);

  const handleInput = (name: string, text: string) => {
    if (name == "doc_name") {
      setDocName(text);
      setIsEditted(text.trim() !== currentDocData?.doc_name);
    } else if (name == "doc_text") {
      setCaption(text);
      setIsEditted(text.trim() !== currentDocData?.doc_text);
    }
  };

  const handleSubmit = async () => {
    if (docName.trim() === "" || caption.trim() === "" || !currentDocData) {
      return;
    }

    await updateDoc({
      ...currentDocData,
      doc_name: docName,
      doc_text: caption,
      lastUpdated: new Date().getTime(),
    });
  };

  useEffect(() => {
    async function handler() {
      if (docs.length === 0) {
        return;
      }

      setCurrentDocData(() => {
        const newData = docs.find((item) => item.doc_id === doc_id) || null;
        setCaption(newData?.doc_text || "");
        setDocName(newData?.doc_name || "");
        return newData;
      });
    }
    handler();
  }, [doc_id]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        {/* <Tabs.Screen
          options={{
            headerTitle: currentDocData ? currentDocData.doc_name : "note",
          }}
        /> */}
        <View style={styles.container}>
          <View>
            <Pressable onPress={handleSubmit} style={styles.icon_holder}>
              <Ionicons name="save-outline" size={24} color={colors.text} />
              <Text style={{ color: colors.text }}>
                {isEditted ? "unsaved changes" : "no changes made"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              onContentSizeChange={(event) =>
                setNameInputHeight(event.nativeEvent.contentSize.height)
              }
              style={[styles.input, { height: Math.max(50, nameInputHeight) }]}
              multiline
              value={docName}
              onChangeText={(text) => handleInput("doc_name", text)}
            ></TextInput>

            <Text style={[styles.labelCount, { color: colors.text }]}>
              {docName.length}/{titleLimit} chars
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <NoteInput
              value={caption}
              onChangeText={(text) => handleInput("doc_text", text)}
              style={styles.input}
              charLimit={descriptionLimit}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
