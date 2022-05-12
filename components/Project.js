import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Card, Paragraph, Title, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Project = ({ project, deleteProject }) => {
  const navigation = useNavigation();

  const [isCompleted, setIsCompleted] = useState(false);
  const markCompleted = () => setIsCompleted(!isCompleted);
  return (
    <View>
      <Card style={{ borderBottomWidth: 2 }}>
        <Card.Content>
          <Title>{project.title}</Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <Text style={{ color: "green" }}>
              {project.dueDate.toDateString()}
            </Text>
            <Text style={{ color: "red" }}>{project.status}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="pencil-square"
              style={{ fontSize: 35, color: "blue" }}
              onPress={() =>
                navigation.navigate("ProjectForm", {
                  editing: true,
                  project: project
                })
              }
            />
            <FontAwesome
              name="trash"
              style={{ fontSize: 35, color: "red" }}
              onPress={() => deleteProject(project.id)}
            />
            <Switch
              value={isCompleted}
              onValueChange={() => setIsCompleted(markCompleted)}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "blue",
    padding: 10,
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  projectDetail: {
    color: "black",
    fontSize: 14,
  },
  projectIcon: {
    color: "blue",
    fontSize: 15,
    marginBottom: 7,
  },
});

export default Project;
