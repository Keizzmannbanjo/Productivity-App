import { StyleSheet, Text, View } from "react-native";
import { Project } from "../components";
import colors from "../constants/colors";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProjectForm from "./ProjectForm";

const Stack = createNativeStackNavigator();

const Projects = ({ projects, deleteProject }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 40, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: colors.blue, fontSize: 20 }}>Projects</Text>
        <Button
          onPress={() => navigation.navigate("ProjectForm", { editing: false })}
        >
          <FontAwesome style={styles.buttonStyles} name="plus-circle" />
        </Button>
      </View>
      {projects.length === 0 ? (
        <>
          <Text>No Projects Available </Text>
        </>
      ) : (
        <>
          {projects.map((item) => (
            <Project
              key={item.id}
              project={item}
              deleteProject={deleteProject}
            />
          ))}
        </>
      )}

      {/* <Text>Projects Here</Text> */}
    </View>
  );
};

const ProjectStack = ({
  projects,
  addToProject,
  deleteProject,
  editProject,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects">
        {(props) => (
          <Projects
            {...props}
            projects={projects}
            deleteProject={deleteProject}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ProjectForm" options={{ title: "Project Form" }}>
        {(props) => (
          <ProjectForm
            {...props}
            addToProject={addToProject}
            editProject={editProject}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProjectStack;

const styles = StyleSheet.create({
  buttonStyles: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 15,
  },
});
