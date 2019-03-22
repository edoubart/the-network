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
const EMAIL_FORMAT_ERROR_MESSAGE = 'Invalid email address';
const EMAIL_PLACEHOLDER = 'Email Address';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const EMAIL_REQUIRED_ERROR_MESSAGE = 'Required';

class Email extends Component {
  // Local state
  state = {
    error: false,
    exited: false,
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
      handleChange('email', data.value, true)();
    } else {
      this.setState({error: false, touched: true});
      handleChange('email', data.value)();
    }
  }

  // Helpers
  renderError(error) {
    return (
      <Message error>{ error }</Message>
    );
  }

  // Validators
  validate(email) {
    let error;

    if (!email) {
      error = EMAIL_REQUIRED_ERROR_MESSAGE;
    } else if (!EMAIL_REGEX.test(email)) {
      error = EMAIL_FORMAT_ERROR_MESSAGE;
    }

    return error;
  }

  render() {
    return (
      <Form.Field
        className='email'
        error={this.state.error && this.state.exited}
        required={this.props.required}
      >
        <Input
          onChange={(event, data) => this.handleLocalChange(event, data, this.props.handleChange)}
          placeholder={EMAIL_PLACEHOLDER}
          required={this.props.required}
          type='text'
          value={this.props.value}
        />
        { (this.state.error && this.state.exited) && this.renderError(this.state.error) }
      </Form.Field>
    );
  }
}
Email.propTypes = {
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default onClickOutside(Email);
