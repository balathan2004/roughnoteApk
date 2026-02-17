import MasonryList from "reanimated-masonry-list";
import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/home.css";
import { View, Text } from "react-native";
import HoverCard from "@/src/components/elements/hover_card";
import { Doc } from "@/src/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { useGetAllDocsQuery } from "@/src/redux/api/docsApi";
import { useEffect } from "react";
import { addNote,createTable } from "@/src/db";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { data: { data: docsData } = {}, isLoading } = useGetAllDocsQuery({});

  useEffect(() => {
    if (docsData) {
      createTable();
      docsData.forEach((doc: Doc) => {
        addNote(doc);
      });
    }
  }, [docsData]);

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>
        Your Notes
      </Text>
      <View style={styles.home_container}>
        <MasonryList // Specify the generic type
          data={docsData ?? []}
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
