import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./footerComponentStyles";

const FooterComponent = ({ logo }) => {
  //tab bar items
  const tabs = [
    {
      title: "TaxiCar",
      subTitle: "",
      icon: "car",
    },
    {
      title: "TaxiShare",
      subTitle: "",
      icon: "car",
    },
    {
      title: "Premium",
      subTitle: "",
      icon: "car",
    },
    {
      title: "TaxiBike",
      subTitle: "",
      icon: "car",
    },
  ];

  return (
    <Footer>
      <FooterTab style={styles.footerContainer}>
        {tabs.map((obj, index) => {
          return (
            <Button key={index}>
              <FontAwesome
                name={obj.icon}
                size={20}
                color={index === 0 ? "#FF5E3A" : "grey"}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: index === 0 ? "#FF5E3A" : "grey",
                }}
              >
                {obj.title}
              </Text>
              <Text style={styles.subText}>{obj.subTitle}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;
