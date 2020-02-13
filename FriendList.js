import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Image
} from "react-native";

const FriendList = props => {
  //console.log("user user############", props.user);
  return (
    <View style={{ marginLeft: "35%", flexDirection: "column" }}>
      <Button
        title={!props.user.blocked ? "Block User" : "Unblock User"}
        onPress={props.handleBlock}
      />
      <Button
        title={!props.user.flag ? "Add Friend" : "Remove Friend"}
        color="green"
        onPress={props.handleSend}
      />
      {/* <Button title="Remove Friend" color="green" onPress={props.handleSend} /> */}
      {props.user.photoURL !== "" && (
        <Image
          style={{
            width: 70,
            height: 70
          }}
          source={{ uri: props.user.photoURL }}
        />
      )}
      <Text> Name :{props.user.displayName} </Text>
    </View>
  );
};
export default FriendList;
