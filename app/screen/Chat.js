import socketIOClient from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  Button,
} from "react-native";
import Card from "../components/Card";
import ConnectionStatus from "../components/ConnectionStatus";
import HorizontalList from "../components/HorizontalList";

function Chat({ ENDPOINT, name }) {
  const [messages, setMessages] = useState([]);
  const [value, onChangeText] = useState("");
  const [soc, setSoc] = useState();
  const [people, setPeople] = useState(0);
  const [users, setUsers] = useState([]);
  const chatIndex = useRef(0);
  const flatListScroll = useRef();

  useEffect(() => {
    const dis = getConnection();
    return dis;
  }, []);

  const getConnection = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("new-user", name || "UNKNOWN");

    setSoc(socket);

    socket.on("connected", (data) => {
      setPeople(data.users.length);
      setUsers([...data.users]);
      //console.log(getUsersWithId(data));
      //setMessages((messages) => [...messages, ...getUsersWithId(data)]);
    });

    socket.on("user-disconnected", (data) => {
      setPeople(data.users.length - 1 < 1 ? 0 : data.users.length - 1);

      setMessages((messages) => [
        ...messages,
        getMessageWithId({ ...data, disconnect: true }),
      ]);

      let user = name;
      let userList = data.users.filter((item) => {
        let bool = item !== user;
        if (!bool) user = null;
        return bool;
      });
      setUsers([...userList]);
    });

    socket.on("new-user", (data) => {
      setPeople(data.users.length);
      setMessages((messages) => [
        ...messages,
        getMessageWithId({ ...data, connect: true }),
      ]);

      let user = name;
      let userList = data.users.filter((item) => {
        let bool = item !== user;
        if (!bool) user = null;
        return bool;
      });
      setUsers([...userList, data.name]);
    });

    socket.on("message", (data) => {
      setMessages((messages) => [...messages, getMessageWithId(data)]);
    });
    return () => socket.disconnect();
  };

  const addChats = (data) => {
    soc.emit("send-chat-message", data.message);
    setMessages((messages) => [...messages, getMessageWithId(data)]);
  };

  const getMessageWithId = (data) => {
    chatIndex.current++;
    const dataId = {
      id: chatIndex.current,
      name: data.name || "Unknown",
      message: data.message,
      right: data.right,
      disconnect: data.disconnect,
      connect: data.connect,
    };
    return dataId;
  };

  // const getUsersWithId = (data) => {
  //   chatIndex.current++;
  //   const dataArray = data.users.map((data) => {
  //     chatIndex.current++;
  //     let user = {
  //       id: chatIndex.current,
  //       name: data || "Unknown",
  //       message: null,
  //       right: null,
  //       disconnect: false,
  //       connect: true,
  //     };

  //     return user;
  //   });
  //   return dataArray;
  // };
  StatusBar.setBackgroundColor("#999");
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          backgroundColor: people ? "#45f" : "grey",
          height: 50,
          width: "100%",
        }}
      >
        <Text style={{ color: "white" }}>
          {people
            ? people === 1
              ? `${people} person connected`
              : `${people} people connected`
            : "0 people connected, ask your friend to join"}
        </Text>
      </View>
      <HorizontalList list={users} />
      <View style={styles.chatWindow}>
        <FlatList
          ref={flatListScroll}
          data={messages}
          keyExtractor={(data) => data.id.toString()}
          renderItem={({ item }) =>
            item.connect || item.disconnect ? (
              <ConnectionStatus data={item} />
            ) : (
              <Card data={item} />
            )
          }
          onContentSizeChange={() => flatListScroll.current.scrollToEnd()}
        />
      </View>
      <View
        style={{
          backgroundColor: "black",
          padding: 10,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderRadius: 10,
            height: 40,
            borderColor: "gray",
            backgroundColor: "grey",
            color: "white",
            paddingLeft: 10,
            borderWidth: 1,
            marginRight: 5,
          }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <Button
          title="  Send  "
          onPress={() => {
            let data = { name: "You", message: value, right: true };

            addChats(data);
            onChangeText("");
          }}
        />
      </View>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
  },
  chatWindow: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    padding: 10,
  },
});
