//import { StatusBar } from "expo-status-bar";
import socketIOClient from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  FlatList,
  Button,
} from "react-native";
import Chat from "./app/screen/Chat";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";

//const ENDPOINT = "http://192.168.43.41:3000";
const ENDPOINT = "https://secret-ravine-71227.herokuapp.com/";

export default function App() {
  const [value, onChangeText] = useState("");
  const [name, setName] = useState();
  return name ? (
    <Chat ENDPOINT={ENDPOINT} name={name} />
  ) : (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "orange",
          borderRadius: 110,
          width: 220,
          height: 220,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          What can we call you?
        </Text>
      </View>
      <View style={{ width: "100%", padding: 10 }}>
        <TextInput
          style={{
            borderRadius: 10,
            height: 40,
            borderColor: "gray",
            backgroundColor: "grey",
            color: "white",
            paddingLeft: 10,
            borderWidth: 1,
            marginVertical: 10,
          }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <Button title="Chat" onPress={() => setName(value.trim())} />
      </View>
    </View>
  );
}
