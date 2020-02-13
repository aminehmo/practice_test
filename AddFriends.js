import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";

const AddFriends = props => {
  return (
    <View>
      <Button
        title="Add Friends"
        color="green"
        onPress={() => props.navigation.navigate("Add Friends")}
      />
    </View>
  );
};
export default AddFriends;
