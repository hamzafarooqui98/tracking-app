import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./headerComponentStyles";

export const HeaderComponent = ({ logo }) => {
  return (
    <Header style={{ backgroundColor: "#FF5E3A" }} iosBarStyle="light-content">
      <Left>
        <Button transparent>
          <FontAwesome name="bars" size={18} color="white" />
        </Button>
      </Left>
      <Body>
        {(logo && (
          <Image resizeMode="contain" style={styles.logo} source={logo} />
        )) || <Text style={styles.headerText}>Driver on the way</Text>}
      </Body>

      <Right>
        <Button transparent>
          <FontAwesome name="gift" size={18} color="white" />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComponent;
