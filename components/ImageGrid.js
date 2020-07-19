import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Layout from "../constants/Layout";
import { TouchableImageWithMetadata } from "./TouchableImageWithMetadata";

// TODO: Rename this to better reflect its purpose
const gridDataTemplate = {
  grid: [[]],
  currentRow: 0,
  maxWidth: 0,
};

let key = 0;

// Props taken:
// images - array of image paths/links and their associated data
// maxWidth - number of images per row
export default function ImageGrid(props) {
  let gridData = deepObjClone(gridDataTemplate);
  gridData.maxWidth = props.maxWidth;

  const filledGrid = props.images.reduce(gridReducer, gridData);
  const imageDimensions = calcImageDimensions(props.maxWidth);

  return (
    <ScrollView style={styles.gridContainer}>
      {filledGrid.grid.map((row) => gridRowToJSX(row, imageDimensions))}
    </ScrollView>
  );
}

function gridReducer({ grid, currentRow, maxWidth }, cell) {
  if (grid[currentRow].length >= maxWidth) {
    grid.push([]);
    currentRow++;
  }

  grid[currentRow].push(cell);

  return {
    grid,
    currentRow,
    maxWidth,
  };
}

function fillLastRow({ grid, currentRow, maxWidth }, placeholder) {
  while (grid[currentRow].length <= maxWidth) {
    grid[currentRow].push(placeholder);
  }
}

function gridRowToJSX(row, imgStyle) {
  return (
    <View style={styles.gridRow} key={key++}>
      {row.map(([itemLink, metadata]) => (
        <TouchableImageWithMetadata
          key={key++}
          metadata={metadata}
          imageStyle={styles.gridImg}
          imageLink={itemLink}
          showTimestamp={true}
        />
      ))}
    </View>
  );
}

function calcImageDimensions(maxWidth) {
  const length = Layout.window.width / maxWidth - 10;
  return {
    width: length,
    height: length,
  };
}

function deepObjClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    marginTop: 5,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  gridImg: {
    width: Layout.window.width / 3 - 10,
    height: Layout.window.width / 3 - 10,
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 3,
  },
});
