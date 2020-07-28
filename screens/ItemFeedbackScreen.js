import * as React from "react";
import { Image, View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useNavigation } from "@react-navigation/native";
//import MultipleChoice from "react-native-multiple-choice-picker";
import { MultipleChoice } from "../components/MultipleChoice";

import Layout from "../constants/Layout";

export function ItemFeedbackScreen(props) {
  const { navigate } = useNavigation();
  const { imageLink } = props.route.params;

  const [itemName, setItemName] = React.useState("Item name");
  const [useClass, setUseClass] = React.useState("Once");

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageLink }} style={styles.itemImage} />
      <Text>What is this item?</Text>
      <TextInput value={itemName} onChangeText={setItemName} />
      <Text>How many times can it be used?</Text>
      {/* <Picker
        selectedValue={useClass}
        onValueChange={(itemValue, itemIndex) => setUseClass(itemValue)}
        style={styles.useClassPicker}
      >
        <Picker.Item label="Once" value="single" />
        <Picker.Item label="More than once" value="multiple" />
      </Picker> */}
      <MultipleChoice
        choices={["Once", "More than once"]}
        defaultValue="Once"
        onChoose={setUseClass}
      />
      <Button title="Submit" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  itemImage: {
    height: Layout.window.height / 2 - 20,
  },
  itemNameInput: {
    width: Layout.window.width,
  },
  useClassPicker: {
    flex: 1,
    height: 10,
    width: Layout.window.width,
  },
});
