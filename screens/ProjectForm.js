import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { status as Statuses, tags as Tags } from "../tempData";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid4 } from "uuid";
import { useRoute } from "@react-navigation/native";

const ProjectForm = ({ addToProject, editProject }) => {
  const route = useRoute();
  const { editing, project } = route.params;
  const [title, setTitle] = useState(editing ? project["title"] : "");
  if (project) console.log("title from route: " + project.title, "title from state:" + title);
  const [dueDate, setDueDate] = useState(
    editing ? project["dueDate"] : new Date(1598051730000)
  );
  const [status, setStatus] = useState(
    editing ? project["status"] : "Next Action"
  );
  const [place, setPlace] = useState(editing ? project["place"] : "");
  // const [tags, setTags] = useState([]);

  const navigation = useNavigation();

  // ! Start of Date Picker Code

  // const [date, setDate] = useState(new Date(1598051730000));

  // const onStartDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setStartDate(currentDate);
  // };

  // const ondueDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setdueDate(currentDate);
  // };

  const showDueDateMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: dueDate,
      onChange: (e, selectedDate) => setDueDate(selectedDate),
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDueDatepicker = () => {
    showDueDateMode("date");
  };

  const handleOnSubmit = () => {
    if (editing) {
      const id = project.id;
      const newProject = {
        id: id,
        title: title,
        status: status,
        place: place,
        dueDate: dueDate,
      };
      console.log('Project on editing', newProject);
      editProject(id, newProject);
    } else {
      addToProject({
        title,
        dueDate,
        place,
        status,
        id: uuid4(),
        isCompleted: false,
      });
    }

    navigation.navigate("Projects");
  };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  // return (
  //   <View>
  //     <View>
  //       <Button onPress={showDatepicker} title="Show date picker!" />
  //     </View>
  //     <View>
  //       <Button onPress={showTimepicker} title="Show time picker!" />
  //     </View>
  //     <Text>selected: {date.toLocaleString()}</Text>
  //   </View>
  // );
  // ! End of Date Picker Code

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.blue, fontWeight: "bold", fontSize: 20 }}>
        Project Form
      </Text>
      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}>Title:</Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={{ height: 30, flex: 2, color: colors.blue }}
          mode="outlined"
        />
      </View>

      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}>Due Date:</Text>
        <Text onPress={showDueDatepicker}> {dueDate.toDateString()}</Text>
      </View>

      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}>Place:</Text>
        <TextInput
          value={place}
          onChangeText={(text) => setPlace(text)}
          style={{ height: 30, flex: 2, color: colors.blue }}
          mode="outlined"
        />
      </View>
      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}> Status: </Text>

        <Picker
          selectedValue={status}
          onValueChange={(value, index) => setStatus(value)}
          style={{ height: 50, width: 150 }}
        >
          {Statuses.map((items) => (
            <Picker.Item key={items} label={items} value={items} />
          ))}
        </Picker>
      </View>
      {/* <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}>Parent Project:</Text>
        <TextInput
          style={{ height: 30, flex: 2, color: colors.blue }}
          mode="outlined"
        />
      </View> */}
      <View>
        <Button
          mode="contained"
          style={{
            width: "50%",
            alignSelf: "center",
            backgroundColor: colors.blue,
            marginTop: 10,
          }}
          onPress={handleOnSubmit}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});
