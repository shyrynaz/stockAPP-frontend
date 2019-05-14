import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import companyReducers from "./companyReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  company: companyReducers
});
