import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { InboxStack, TaskStack, ProjectStack } from "./screens";
import { FontAwesome } from "@expo/vector-icons";
import colors from './constants/colors'

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const addToTask = (newTask) => {
    const newTaskList = [...tasks, newTask];
    setTasks(newTaskList);
  };

  const editTask = (id, newTask) => {
    const allTasks = tasks.filter((item) => item.id !== id);
    setTasks([...allTasks, newTask]);
  };

  const setTaskCompleted = (editedTaskId) => {
    const allTasks = tasks.map((item) => {
      const task = item;
      if (task.id == editedTaskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      } else {
        return task;
      }
    });
    setTasks(allTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(newTasks);
  };

  const addToProject = (newProject) => {
    const newProjectList = [...projects, newProject];
    setProjects(newProjectList);
  };

  const editProject = (id, newProject) => {
    const allProjects = projects.filter((item) => item.id !== id);
    console.log("All projects on filtering:",allProjects)
    console.log("New project passed in to edit function", newProject)
    setProjects([...allProjects, newProject]);
    console.log("Projects After Editing")
    console.log(projects)
  };

  const setProjectCompleted = (editedProjectId) => {
    const allProjects = projects.map((item) => {
      const project = item;
      if (project.id == editedProjectId) {
        return {
          ...project,
          isCompleted: !project.isCompleted,
        };
      } else {
        return project;
      }
    });
    setTasks(allProjects);
  };

  const deleteProject = (projectId) => {
    const newProjects = projects.filter((item) => item.id !== projectId);
    setProjects(newProjects);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="InboxStack" options={{ title: "Inbox", tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="database"
                size={24}
                color={tabInfo.focused ? colors.blue : "grey"}
              />
            );
          }}}>
          {(props) => (
            <InboxStack
              {...props}
              addToTask={addToTask}
              addToProject={addToProject}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="TaskStack"
          options={{ headerShown: false, title: "Tasks", tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="list"
                size={24}
                color={tabInfo.focused ? colors.blue : "grey"}
              />
            );
          }, }}
        >
          {(props) => (
            <TaskStack
              {...props}
              tasks={tasks}
              addToTask={addToTask}
              setCompleted={setTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
              projects={projects}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="ProjectStack"
          options={{ headerShown: false, title: "Projects", tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="list-alt"
                size={24}
                color={tabInfo.focused ? colors.blue : "grey"}
              />
            );
          } }}
        >
          {(props) => (
            <ProjectStack
              {...props}
              projects={projects}
              addToProject={addToProject}
              deleteProject={deleteProject}
              editProject={editProject}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
