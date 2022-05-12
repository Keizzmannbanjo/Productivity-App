import { StyleSheet, View } from "react-native";
import { EmptyInbox, FilledInbox } from "../components";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxForm from "./InboxForm";
import Processing from "./Processing";

const Stack = createNativeStackNavigator();

const Inbox = ({ inbox, removeFromInbox }) => {
  return (
    <View style={styles.container}>
      {inbox.length === 0 ? (
        <EmptyInbox />
      ) : (
        <FilledInbox items={inbox} removeFromInbox={removeFromInbox} />
      )}
    </View>
  );
};

const InboxStack = ({ addToTask, addToProject }) => {
  const [inbox, setInbox] = useState([]);

  const addToInbox = (newItem) => {
    const newInbox = [...inbox, newItem];
    setInbox(newInbox);
  };

  const removeFromInbox = (id) => {
    const newInbox = inbox.filter((item) => item.id !== id);
    setInbox([...newInbox]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Inbox" options={{ headerTitle: "Inbox" }}>
        {(props) => (
          <Inbox {...props} inbox={inbox} removeFromInbox={removeFromInbox} />
        )}
      </Stack.Screen>
      <Stack.Screen name="InboxForm" options={{ headerTitle: "Inbox Form" }}>
        {(props) => <InboxForm {...props} addToInbox={addToInbox} />}
      </Stack.Screen>
      <Stack.Screen
        name="Processing"
        options={{ headerTitle: "Inbox Processing" }}
      >
        {(props) => (
          <Processing
            {...props}
            addToProject={addToProject}
            addToTask={addToTask}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InboxStack;
