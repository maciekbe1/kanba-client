import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import CardsDragDrop from "components/Cards/card-drag-drop/CardsDragDrop";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { storeFactory } from "store/testUtils";

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

describe("render", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it("should create component with no card", () => {
    const noCards = <div className="no-cards">No cards</div>;
    expect(wrapper.contains(noCards)).toEqual(true);
  });
  it("should create card", () => {});
});
