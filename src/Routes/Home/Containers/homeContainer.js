import { connect } from "react-redux";
import Home from "../Components/home";
import {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
} from "../Modules/home";

const mapStateToProps = (state) => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || [],
});

const mapActionCreaters = {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
};

export default connect(mapStateToProps, mapActionCreaters)(Home);
