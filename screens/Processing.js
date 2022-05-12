import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";

const Processing = ({ addToProject, addToTask }) => {
  const [isInboxActionable, setIsInboxActionable] = useState(false)

  const route = useRoute();
  const { inboxItem } = route.params;
  return (
    <View>
      <Text>Inbox Title: {inboxItem.text}</Text>

      <View>
        <Text>Is This Actionable:</Text>
      </View>
    </View>
  );
};

export default Processing;

const styles = StyleSheet.create({});
