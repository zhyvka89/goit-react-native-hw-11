import { fetchUsers } from "@/api";
import { useGeneration } from "@/contexts/GenerationContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { RootStackParamList } from "@/navigation/NativeStackNavigator";
import { getThemeColors } from "@/utilities/theme";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'MembersList'>;

export default function MembersList({
  navigation,
}: Props) {
  const [members, setMembers] = useState([]);
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);
  const { generation } = useGeneration();

  console.log(theme)

  useEffect(() => {
    fetchUsers()
      .then((result) => setMembers(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {generation ? `${generation.title} Members` : "Members"}
      </Text>

      <FlatList
        data={members}
        key={"2-cols"}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.memberRow}
            onPress={() =>
              navigation.navigate("MemberDetails", { memberId: item.id })
            }
          >
            <Image
              source={require("../assets/images/avatar.jpg")}
              style={styles.avatar}
            />
            <Text style={[styles.name , {color: colors.text}]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
  },
});
