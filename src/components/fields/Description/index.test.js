// Enzyme
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React
import React from 'react';

// Semantic UI
import { Form, Message, TextArea } from 'semantic-ui-react';

// Custom
import DescriptionField from './index.js';

configure({ adapter: new Adapter() });

describe('<DescriptionField />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DescriptionField />);
  });

  it('should render a <DescriptionField />', () => {
    expect(wrapper.find(Form.Field)).toHaveLength(1);
  });

  it('should render a <TextArea />', () => {
    expect(wrapper.find(TextArea)).toHaveLength(1);
  });
});
