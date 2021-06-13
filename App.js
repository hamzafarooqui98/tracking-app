import React, { useState } from "react";
// import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";

import Root from "./src/main";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <Root {...this.props} />;
}
