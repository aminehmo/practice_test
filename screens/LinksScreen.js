import { useState, useEffect } from "react";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import AddFriends from "../AddFriends";
import FriendList from "../FriendList";
import firebase from "@firebase/app";
import "firebase/auth";

import db from "../db.js";

const LinksScreen = props => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const handleAdd = user => {
    friends.map(friend => {
      if (friend.id === firebase.auth().currentUser.uid) {
        let myFriends = friend.friends;
        if (!myFriends.includes(user.id)) {
          db.collection("Friends")
            .doc(firebase.auth().currentUser.uid)
            .update({
              friends: [...myFriends, user.id]
            });
          users.map(item => {
            if (item.id === user.id) {
              item.flag = true;
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    db.collection("users").onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        //mapping
        users.push({ id: doc.id, ...doc.data(), flag: false, blocked: false });
      });
      setUsers([...users]);
    });


    db.collection("Friends").onSnapshot(querySnapshot => {
      const friends = [];
      querySnapshot.forEach(doc => {
        //mapping
        friends.push({ id: doc.id, ...doc.data() });
      });
      setFriends([...friends]);
    });


    
    db.collection("blocked").onSnapshot(querySnapshot => {
      const blockedUsers = [];
      querySnapshot.forEach(doc => {
        blockedUsers.push({ id: doc.id, ...doc.data() });
      });
      setBlocked([...blockedUsers]);
    });
  }, []);

  const handleRemove = user => {
    friends.map(friend => {
      if (friend.id === firebase.auth().currentUser.uid) {
        let myFriends = friend.friends;
        if (myFriends.includes(user.id)) {
          let index = myFriends.indexOf(user.id);
          myFriends.splice(index, 1);
          db.collection("Friends")
            .doc(firebase.auth().currentUser.uid)
            .update({
              friends: [...myFriends]
            });

          users.map(item => {
            if (item.id === user.id) {
              item.flag = false;
            }
          });
        }
      }
    });
  };

  const handleBlock = user => {
    blocked.map(item => {
      if (item.id === firebase.auth().currentUser.uid) {
        let blockedUsers = item.users;
        if (!blockedUsers.includes(user.id)) {
          db.collection("blocked")
            .doc(firebase.auth().currentUser.uid)
            .update({
              users: [...blockedUsers, user.id]
            });
          users.map(item => {
            if (item.id === user.id) {
              item.blocked = true;
            }
          });
        }
      }
    });
  };

  const handleUnblock = user => {
    blocked.map(item => {
      if (item.id === firebase.auth().currentUser.uid) {
        let blockedUsers = item.users;
        if (blockedUsers.includes(user.id)) {
          let index = blockedUsers.indexOf(user.id);
          blockedUsers.splice(index, 1);
          db.collection("blocked")
            .doc(firebase.auth().currentUser.uid)
            .update({
              users: [...blockedUsers]
            });

          users.map(item => {
            if (item.id === user.id) {
              item.blocked = false;
            }
          });
        }
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>List of Friends</Text>

        {users.map((user, i) => {
          return user.id !== firebase.auth().currentUser.uid ? (
            <FriendList
              key={i}
              user={user}
              handleSend={
                !user.flag ? () => handleAdd(user) : () => handleRemove(user)
              }
              handleBlock={
                !user.blocked
                  ? () => handleBlock(user)
                  : () => handleUnblock(user)
              }
            />
          ) : null;
        })}
      </View>
    </ScrollView>
  );
};

LinksScreen.navigationOptions = {
  title: "Links"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
export default LinksScreen;
