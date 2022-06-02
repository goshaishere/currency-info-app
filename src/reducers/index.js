import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import converterReducer from "./converterReducer";
import exchangeRatesReducer from "./exchangeRatesReducer";
import responseReducer from "./responseReducer";

const rootReducer = combineReducers({
  converter: converterReducer,
  rates: exchangeRatesReducer,
  response: responseReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);