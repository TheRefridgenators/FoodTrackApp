import * as React from "react";
import { View, Text } from "react-native";
import { FullWidthButton } from "../components/FullWidthButton";

const contents = (
  <View>
    <Text>Hello!</Text>
  </View>
)

export function ItemInfo(props) {
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
      <Text>This is the item info screen. Supplied parameter: {props.test || props.route.params.test}</Text>
      <FullWidthButton contents={contents} useArrow={true}/>
      <Text>Test 2</Text>
    </View>
  )
}