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

const TaskForm = ({ allProjects, addToTask, editTask, allTasks }) => {
  const route = useRoute();

  const { editing, editedTask } = route.params;
  const [title, setTitle] = useState(editing ? editedTask.title : "");

  const [dueDate, setDueDate] = useState(
    editing ? editedTask.dueDate : new Date(1598051730000)
  );
  const [status, setStatus] = useState(
    editing ? editedTask.status : "Next Action"
  );
  const [place, setPlace] = useState(editing ? editedTask.place : "");
  const [project, setProject] = useState(editing ? editedTask.project : "");

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
      const id = editedTask.id;
      const newTask = {
        id: id,
        title: title,
        status: status,
        place: place,
        dueDate: dueDate,
        project: project,
      };
      editTask(id, newTask);
    } else {
      addToTask({
        title,
        dueDate,
        place,
        status,
        project,
        id: uuid4(),
        isCompleted: false,
      });
    }

    navigation.navigate("Tasks");
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
        Task Form
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
      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ flex: 1, fontWeight: "bold" }}> Project: </Text>

        <Picker
          selectedValue={project}
          onValueChange={(value, index) => setProject(value)}
          style={{ height: 50, width: 150 }}
        >
          {allProjects.length === 0 ? (
            <Picker.Item key={0} label="No projects available" value={null} />
          ) : (
            allProjects.map((item) => (
              <Picker.Item key={item.id} label={item.title} value={item.id} />
            ))
          )}
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

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});
