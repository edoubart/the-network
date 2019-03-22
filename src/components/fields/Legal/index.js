// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Semantic UI
import { Checkbox, Form } from 'semantic-ui-react';

// Style
import './index.scss';

// Constants
const LEGAL_CHECKBOX_LABEL = 'I hereby accept the terms of service for THE NETWORK and the Privacy Policy.';

// Handlers
function handleLocalChange(event, data, handleChange) {
  handleChange('legal', data.checked)();
}

const legal = (props) => (
  <Form.Field className='legal' required={props.required}>
    <Checkbox
      checked={props.value}
      onChange={(event, data) => handleLocalChange(event, data, props.handleChange)}
      label={LEGAL_CHECKBOX_LABEL}
      required={props.required}
    />
  </Form.Field>
);
legal.propTypes = {
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.bool
};

export default legal;
