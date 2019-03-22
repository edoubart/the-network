// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// React onClickOutside
import onClickOutside from 'react-onclickoutside';

// Semantic UI
import { Form, Message, TextArea } from 'semantic-ui-react';

// Style
import './index.scss';

// Constants
const DESCRIPTION_MAXIMUM_LENGTH = 300;
const DESCRIPTION_MAXIMUM_LENGTH_ERROR_MESSAGE = `Must be lesser than ${DESCRIPTION_MAXIMUM_LENGTH} characters`;
const DESCRIPTION_MINIMUM_LENGTH = 20;
const DESCRIPTION_MINIMUM_LENGTH_ERROR_MESSAGE = `Must be at least ${DESCRIPTION_MINIMUM_LENGTH} characters`;
const DESCRIPTION_REQUIRED_ERROR_MESSAGE = 'Required';
const DESCRIPTION_ROWS = 6;

class Description extends Component {
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
      handleChange('description', data.value, true)();
    } else {
      this.setState({error: false, touched: true});
      handleChange('description', data.value)();
    }
  }

  // Helpers
  renderError(error) {
    return (
      <Message error>{ error }</Message>
    );
  }

  // Validators
  validate(description) {
    let error;

    if (!description) {
      error = DESCRIPTION_REQUIRED_ERROR_MESSAGE;
    } else if (description.length < DESCRIPTION_MINIMUM_LENGTH) {
      error = DESCRIPTION_MINIMUM_LENGTH_ERROR_MESSAGE;
    } else if (description.length > DESCRIPTION_MAXIMUM_LENGTH) {
      error = DESCRIPTION_MAXIMUM_LENGTH_ERROR_MESSAGE;
    }

    return error;
  }

  render() {
    return (
      <Form.Field
        className='description'
        error={this.state.error && this.state.exited}
        required={this.props.required}
      >
        <TextArea
          onChange={(event, data) => this.handleLocalChange(event, data, this.props.handleChange)}
          required={this.props.required}
          rows={DESCRIPTION_ROWS}
          type='text'
          value={this.props.value}
        />
        { (this.state.error && this.state.exited) && this.renderError(this.state.error) }
      </Form.Field>
    );
  }
}
Description.propTypes = {
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default onClickOutside(Description);
