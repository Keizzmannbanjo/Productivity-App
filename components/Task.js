import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Card, Paragraph, Title, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Task = ({ task, setCompleted, deleteTask, projects }) => {
  const navigation = useNavigation();

  const renderParentProject = () => {
    if (task.project) {
      const projectId = task.project;
      const taskProject = projects.filter((item) => item.id === projectId);
      if (taskProject) {
        return (
          <Text style={{ color: "blue" }}>Project: {taskProject.title}</Text>
        );
      }
    }
    return <Text style={{ color: "red" }}>No Parent Project</Text>;
  };

  const [isCompleted, setIsCompleted] = useState(false);
  const markCompleted = () => {
    setIsCompleted(!isCompleted);
    setCompleted(task.id);
  };
  return (
    <View>
      <Card style={{ borderBottomWidth: 2 }}>
        <Card.Content>
          <Title>{task.title}</Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Text style={{ color: "green" }}>
              {task.dueDate.toDateString()}
            </Text>
            <Text style={{ color: "red" }}>{task.status}</Text>
            <Text style={{ color: "blue" }}>{task.place}</Text>
          </View>
          <View style={{marginTop:8}}>{renderParentProject()}</View>
          <View
            style={{
              flexDirection: "row",
              width: "60%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="pencil-square"
              style={{ fontSize: 35, color: "blue" }}
              onPress={() =>
                navigation.navigate("TaskForm", {
                  editing: true,
                  editedTask: task,
                })
              }
            />

            <FontAwesome
              onPress={() => deleteTask(task.id)}
              name="trash"
              style={{ fontSize: 35, color: "red" }}
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
  taskTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  taskDetail: {
    color: "black",
    fontSize: 14,
  },
  taskIcon: {
    color: "blue",
    fontSize: 15,
    marginBottom: 7,
  },
});

export default Task;
