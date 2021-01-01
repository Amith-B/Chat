import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

function HorizontalList({ list }) {
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        style={styles.scroll}
      >
        {list &&
          list.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={{ fontWeight: "bold", color: "white" }}>{item}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
  },

  card: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08f",
    borderRadius: 20,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default HorizontalList;
