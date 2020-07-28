import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export function MultipleChoice(props) {
  const [currentValue, setValue] = React.useState(props.defaultValue);

  return (
    <View style={styles.container}>
      {props.choices.map((val) =>
        choicePropToButton(val, currentValue, setValue, props.onChoose)
      )}
    </View>
  );
}

let count = 0;

function choicePropToButton(buttonValue, activeChoice, onChoose, updateParent) {
  const buttonStyle =
    buttonValue === activeChoice ? styles.activeButton : styles.inactiveButton;

  return (
    <Button
      key={count++}
      title={buttonValue}
      style={styles.inactiveButton}
      onPress={() => {
        onChoose(buttonValue);
        updateParent(buttonValue);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeButton: {
    color: "#0022ee",
  },
  inactiveButton: {
    color: "#cccccc",
  },
});
