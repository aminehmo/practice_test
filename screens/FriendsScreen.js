import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import firebase from "@firebase/app";
import "firebase/auth";

import db from "../db.js";

export default FriendsScreen = () => {
  const [friendList, setFriendList] = useState([]);

  const handleUserFriends = async () => {
    // db.collection("Friends").onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     if (doc.id === firebase.auth().currentUser.uid) {
    //       let friends = [];
    //       const userFriends = doc.data().friends;
    //       userFriends.map(friend => {
    //         db.collection("users")
    //           .doc(friend)
    //           .get()
    //           .then(doc => {
    //             friends.push(doc.data().displayName);
    //           });
    //       });
    //       // setFriendList(friends);
    //       console.log(friends);
    //     }
    //   });
    // });

    // const snap = await db
    //   .collection("Friends")
    //   .doc(firebase.auth().currentUser.uid)
    //   .get();
    // const array = snap.friends;
    // console.log(array);
  };

  useEffect(() => {
    handleUserFriends();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {friendList.map(item => {
        <Text>{item.displayName}</Text>;
      })} */}
      {console.log("tyfghvghcvjfcgkhvfc", friendList)}
    </View>
  );
};
