import React from "react";
import Enzyme, { shallow } from "enzyme";
// import Hello from "components/Hello";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("renders welcome message", () => {
  // const wrapper = shallow(<Hello />);
  // const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).toBe(true);
  // expect(wrapper.contains(welcome)).toEqual(true);
});
