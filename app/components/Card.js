import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";

function Card({ data }) {
  const bg = data.right ? "#253" : "#555";
  return (
    <View style={data.right ? styles.right : styles.left}>
      <View style={{ ...styles.container, backgroundColor: bg }}>
        {!data.right && (
          <Text style={{ fontSize: 13, color: "#ee0", fontWeight: "bold" }}>
            {data.name}
          </Text>
        )}
        <Text style={{ fontSize: 16, color: "#fff" }}>{data.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    width: "auto",
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 10,
  },
  right: { flexDirection: "row-reverse" },
  left: { flexDirection: "row" },
});

export default Card;
