import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid4 } from "uuid";

const InboxForm = ({ addToInbox }) => {
  const navigation = useNavigation()
  const [inboxValue, setInboxValue] = useState("");

  const handleOnSubmit = () => {
    addToInbox({text:inboxValue, id:uuid4()})
    navigation.navigate('Inbox')
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.blue, fontSize: 23, fontWeight: "bold" }}>
        Inbox Form
      </Text>
      <TextInput
        value={inboxValue}
        onChangeText={(value) => setInboxValue(value)}
        mode="outlined"
        style={{ height: 50, width: "70%", marginTop: 7 }}
      />
      <TouchableOpacity style={{ marginTop: 10 }} onPress={handleOnSubmit}>
        <Button
          mode="contained"
          style={{ backgroundColor: colors.blue, borderRadius: 10 }}
        >
          Add To Inbox
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default InboxForm;

const styles = StyleSheet.create({});
