// Enzyme
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React
import React from 'react';

// Semantic UI
import { Form, Input, Message } from 'semantic-ui-react';

// Custom
import LastNameField from './index.js';

configure({ adapter: new Adapter() });

describe('<LastNameField />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LastNameField />);
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

  it('should render an <Input /> with a placeholder \'Last Name\'', () => {
    expect(wrapper.find(Input).props().placeholder).toEqual('Last Name');
  });
});
