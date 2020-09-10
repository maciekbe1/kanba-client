import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { storeFactory } from "store/testUtils";
import { createStore } from "redux";
import rootReducer from "store/reducers/index";

import { wait, updateWrapper } from "helper/testHelper";

import CardsDragDrop from "components/Cards/card-drag-drop/CardsDragDrop";

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <CardsDragDrop />
    </Provider>
  );
  return wrapper;
};
describe("simple test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it("<test />", () => {
    console.log(wrapper.debug());
    expect(wrapper);
  });
});
