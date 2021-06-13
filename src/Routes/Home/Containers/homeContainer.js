import { connect } from "react-redux";
import Home from "../Components/home";
import { getCurrentLocation, getInputData } from "../Modules/home";

const mapStateToProps = (state) => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
});

const mapActionCreaters = {
  getCurrentLocation,
  getInputData,
};

export default connect(mapStateToProps, mapActionCreaters)(Home);
