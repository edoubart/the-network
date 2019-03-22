// Enzyme
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React
import React from 'react';

// Semantic UI
import { Form, Input, Message } from 'semantic-ui-react';

// Custom
import FirstNameField from './index.js';

configure({ adapter: new Adapter() });

describe('<FirstNameField />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FirstNameField />);
  });

  it('should render a <Form.Field />', () => {
    expect(wrapper.find(Form.Field)).toHaveLength(1);
  });

  it('should render an <Input />', () => {
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it('should render an <Input /> of type \'text\'', () => {
    expect(wrapper.find(Input).props().type).toEqual('text');
  });

  it('should render an <Input /> with a placeholder \'First Name\'', () => {
    expect(wrapper.find(Input).props().placeholder).toEqual('First Name');
  });
});
