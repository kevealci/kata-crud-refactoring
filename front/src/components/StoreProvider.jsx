import React, { useReducer } from "react";
import { todoReducer, todoInitialState } from "../reducers/todoReducer";
import { todoContext } from "../context/todoContext";

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);

  return <todoContext.Provider value={{ state, dispatch }}>
    {children}
  </todoContext.Provider>

}