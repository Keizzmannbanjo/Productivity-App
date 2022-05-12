import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { Card, Paragraph, Title, Button } from "react-native-paper";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const FilledInbox = ({ items, removeFromInbox }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 0 }}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>Inbox </Text>
        </View>
        <View>
          <Button onPress={() => navigation.navigate("InboxForm")}>
            <FontAwesome style={styles.buttonStyles} name="plus-circle" />
          </Button>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        {items.map((item) => (
          <View key={item.id}>
            <Card style={styles.itemStyle}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.text}</Text>
                  <FontAwesome
                    style={{ fontSize: 35, color: colors.blue }}
                    name="trash"
                    onPress={() => removeFromInbox(item.id)}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemStyle: {
    marginBottom: 5,
  },
  textStyles: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonStyles: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 15,
  },
});

export default FilledInbox;
