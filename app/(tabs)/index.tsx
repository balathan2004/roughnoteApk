import MasonryList from "reanimated-masonry-list";
import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/home.css";
import { View, Text } from "react-native";
import HoverCard from "@/src/components/elements/hover_card";
import { Doc } from "@/src/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { useAuth } from "@/src/redux/api/authSlice";

export default function HomeScreen() {
  const { colors } = useTheme();

  const { docs } = useAuth();

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>
        Your Notes
      </Text>
      <View style={styles.home_container}>
        <MasonryList // Specify the generic type
          data={docs ?? []}
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
