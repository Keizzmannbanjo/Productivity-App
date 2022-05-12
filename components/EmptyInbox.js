import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const EmptyInbox = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Inbox Basket {"\n"} is {"\n"} Empty
      </Text>
      <Button onPress={() => navigation.navigate("InboxForm")}>
        <FontAwesome style={styles.buttonStyles} name="plus-circle" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonStyles: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 15,
  },
});
export default EmptyInbox;
