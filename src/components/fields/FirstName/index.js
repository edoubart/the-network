// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// React onClickOutside
import onClickOutside from 'react-onclickoutside';

// Semantic UI
import { Form, Input, Message } from 'semantic-ui-react';

// Style
import './index.scss';

// Constants
const FIRST_NAME_MAXIMUM_LENGTH = 30;
const FIRST_NAME_MAXIMUM_LENGTH_ERROR_MESSAGE = `Must be lesser than ${FIRST_NAME_MAXIMUM_LENGTH} characters`;
const FIRST_NAME_MINIMUM_LENGTH = 2;
const FIRST_NAME_MINIMUM_LENGTH_ERROR_MESSAGE = `Must be at least ${FIRST_NAME_MINIMUM_LENGTH} characters`;
const FIRST_NAME_PLACEHOLDER = 'First Name';
const FIRST_NAME_REQUIRED_ERROR_MESSAGE = 'Required';

class FirstName extends Component {
  // Local state
  state = {
    error: false,
    exited: false,
    show: false,
    touched: false
  };

  // Handlers
  handleClickOutside() {
    if (this.state.touched) {
      this.setState({ exited: true });
    }
  }

  handleLocalChange(event, data, handleChange) {
    let error = this.validate(data.value);

    if (error) {
      this.setState({error: error, touched: true});
      handleChange('firstName', data.value, true)();
    } else {
      this.setState({error: false, touched: true});
      handleChange('firstName', data.value)();
    }
  }

  // Helpers
  renderError(error) {
    return (
      <Message error>{error}</Message>
    );
  }

  // Validators
  validate(firstName) {
    let error;

    if (!firstName) {
      error = FIRST_NAME_REQUIRED_ERROR_MESSAGE;
    } else if (firstName.length < FIRST_NAME_MINIMUM_LENGTH) {
      error = FIRST_NAME_MINIMUM_LENGTH_ERROR_MESSAGE;
    } else if (firstName.length > FIRST_NAME_MAXIMUM_LENGTH) {
      error = FIRST_NAME_MAXIMUM_LENGTH_ERROR_MESSAGE;
    }

    return error;
  }

  render() {
    return (
      <Form.Field
        className='firstName'
        error={this.state.error && this.state.exited} required={this.props.required}
      >
        <Input
          onChange={(event, data) => this.handleLocalChange(event, data, this.props.handleChange)}
          placeholder={FIRST_NAME_PLACEHOLDER}
          required={this.props.required}
          value={this.props.value}
        />
        { (this.state.error && this.state.exited) && this.renderError(this.state.error) }
      </Form.Field>
    );
  }
}
FirstName.propTypes = {
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default onClickOutside(FirstName);
