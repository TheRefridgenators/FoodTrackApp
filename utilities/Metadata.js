import * as React from "react";
import { Text } from "react-native";

let id = 0;

export function stringifyMetadata([key, value]) {
  return (
    <Text key={id++}>
      <Text style={{ fontWeight: "bold" }}>{key.toString()}: </Text>
      {value.toString()}
    </Text>
  );
}

function capitalizeFirstLetters(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
