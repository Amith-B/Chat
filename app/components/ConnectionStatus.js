import React from "react";
import { View, StyleSheet, Text } from "react-native";

function ConnectionStatus({ data }) {
  return (
    <View style={styles.container}>
      {data.connect && (
        <View>
          <Text style={styles.green}>{data.name + " connected"}</Text>
        </View>
      )}
      {data.disconnect && (
        <View>
          <Text style={styles.red}>{data.name + " disconnected"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  green: {
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "green",
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  red: {
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "red",
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});

export default ConnectionStatus;
