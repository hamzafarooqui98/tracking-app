import React from "react";
import { Text } from "react-native";
import { View } from "native-base";

import styles from "./fareStyles";

export const Fare = ({ fare }) => {
  return (
    <View style={styles.fareContainer}>
      <Text style={styles.text}>
        <Text> FARE: Rs. </Text> <Text style={styles.amount}>{fare}</Text>
      </Text>
    </View>
  );
};

export default Fare;
