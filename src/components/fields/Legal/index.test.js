// Enzyme
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React
import React from 'react';

// Semantic UI
import { Checkbox, Form, Message } from 'semantic-ui-react';

// Custom
import LegalField from './index.js';

configure({ adapter: new Adapter() });

describe('<LegalField />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LegalField />);
  });

  it('should render a <Form.Field />', () => {
    expect(wrapper.find(Form.Field)).toHaveLength(1);
  });

  it('should render a <Checkbox />', () => {
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it('should render a <Checkbox /> with a label', () => {
    expect(wrapper.find(Checkbox).props().label).toBeTruthy();
  });
});
