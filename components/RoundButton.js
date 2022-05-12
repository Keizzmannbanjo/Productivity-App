import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../constants";

const RoundButton = ({ navigateToForm }) => {
  return (
    <TouchableOpacity onPress={() => navigateToForm}>
      <FontAwesome style={styles.buttonStyles} name="plus-circle" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 15,
  },
});

export default RoundButton;
