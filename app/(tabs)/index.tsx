import MasonryList from "reanimated-masonry-list";
import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/home.css";
import { View, Text } from "react-native";
import HoverCard from "@/src/components/elements/hover_card";
import { Doc } from "@/src/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { useGetAllDocsQuery } from "@/src/redux/api/docsApi";
import { useEffect, useState } from "react";
import { addNote, getAllNotes } from "@/src/db";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { data: { data: docsData } = {}, isLoading } = useGetAllDocsQuery({});

  const [localData, setLocalData] = useState<Doc[]>([]);


  const fetchDocs = async () => {
    if (!docsData) return;

    const promises = docsData.map((doc) => addNote(doc));

    await Promise.all(promises).catch((error) => {
      console.error("Error saving docs:", error);
    });
  };

  useEffect(() => {
    if (docsData) {
      fetchDocs();
    }
  }, [docsData]);

  useEffect(() => {
    const fetchLocalNotes = async () => {
      const localNotes = await getAllNotes();
      setLocalData(localNotes);
    };

    fetchLocalNotes();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>
        Your Notes
      </Text>
      <View style={styles.home_container}>
        <MasonryList // Specify the generic type
          data={localData ?? []}
          keyExtractor={(item) => item.id} // Explicit cast
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: unknown; i: number }) => {
            const typedItem = item as Doc; // Type assertion
            return <HoverCard data={typedItem} />;
          }}
        />
      </View>
    </View>
  );
}
