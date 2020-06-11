import React from "react";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

const mockStore = configureStore();
const mockedStore = (mockedState) => {
  return mockStore(mockedState);
};

export const customRender = (ui, mockedState = null) => {
  const store = mockedStore(mockedState);

  const WithProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { ...render(ui, { wrapper: WithProvider }) };
};
