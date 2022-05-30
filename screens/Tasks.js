import { StyleSheet, Text, View } from "react-native";
import { Task } from "../components";
import colors from "../constants/colors";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TaskForm from "./TaskForm";

const Stack = createNativeStackNavigator();

const Tasks = ({ tasks, setCompleted, deleteTask, projects }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 40, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: colors.blue, fontSize: 20 }}>Tasks</Text>
        <Button
          onPress={() => navigation.navigate("TaskForm", { editing: false })}
        >
          <FontAwesome style={styles.buttonStyles} name="plus-circle" />
        </Button>
      </View>
      {tasks.length === 0 ? (
        <>
          <Text>No Tasks Available </Text>
        </>
      ) : (
        <>
          {tasks.map((item) => (
            <Task
              key={item.id}
              task={item}
              setCompleted={setCompleted}
              deleteTask={deleteTask}
              projects={projects}
            />
          ))}
        </>
      )}

    </View>
  );
};

const TaskStack = ({
  tasks,
  addToTask,
  setCompleted,
  deleteTask,
  editTask,
  projects,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks">
        {(props) => (
          <Tasks
            {...props}
            tasks={tasks}
            setCompleted={setCompleted}
            deleteTask={deleteTask}
            projects={projects}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="TaskForm" options={{ title: "Task Form" }}>
        {(props) => (
          <TaskForm
            {...props}
            allTasks={tasks}
            addToTask={addToTask}
            editTask={editTask}
            allProjects={projects}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default TaskStack;

const styles = StyleSheet.create({
  buttonStyles: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 15,
  },
});
