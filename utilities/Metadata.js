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

export function formatTimestamp(dateObj) {
  return dateObj.format("M/D/YYYY [at] h:mm A");
}

export function sortDatesDescending(date1, date2) {
  return date2 - date1;
}

function capitalizeFirstLetters(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
