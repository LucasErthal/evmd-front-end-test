import { createStore } from "redux";

const initialState = {
  id: null,
};

function reducer(state = initialState, action) {
  if(action.type === "SET_ID") {
    return {
      id: action.id,
    };
  } 
}

const store = createStore(reducer);

export default store;