import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = {
  fareContainer: {
    width: width,
    height: 40,
    padding: 10,
    backgroundColor: "grey",
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  amount: {
    fontWeight: "bold",
  },
};

export default styles;
