// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// React onClickOutside
import onClickOutside from 'react-onclickoutside';

// Semantic UI
import {
  Dimmer,
  Form,
  Loader,
  Message,
  Select
} from 'semantic-ui-react';

// Style
import './index.scss';

// Service
import { serviceTypes } from './../../../services';

// Constants
const SERVICE_TYPE_PLACEHOLDER = 'Select Service Type';
const SERVICE_TYPE_REQUIRED_ERROR_MESSAGE = 'Required';

class ServiceType extends Component {
  // Local state
  state = {
    error: false,
    exited: false,
    options: [],
    touched: false,
    fetching: false
  };

  // Lifecycle hooks
  componentDidMount() {
    this.setState({ fetching: true });

    serviceTypes.fetchAll()
      .then(data => {
        this.setState({ fetching: false });

        return data.map((option, index) => {
          return {
            key: index,
            text: option.display_name,
            value: option.id
          };
        })
      })
      .then(options => {
        this.setState({ options });
      })
      .catch(error => {
        this.setState({ fetching: false });
      });
  }

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
      handleChange('serviceType', data.value, true)();
    } else {
      this.setState({error: false, touched: true});
      handleChange('serviceType', data.value)();
    }
  }

  // Helpers
  renderError(error) {
    return (
      <Message error>{ error }</Message>
    );
  }

  // Validators
  validate(id) {
    let error;

    if (!id) {
      error = SERVICE_TYPE_REQUIRED_ERROR_MESSAGE;
    }

    return error;
  }

  render() {
    let component;

    if (this.state.fetching) {
      component = (
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }
    else {
      component = (
        <Form.Field
          className='serviceType'
          error={this.state.error && this.state.exited}
          required={this.props.required}
        >
          <Select
            onChange={(event, data) => this.handleLocalChange(event, data, this.props.handleChange)}
            options={this.state.options}
            placeholder={SERVICE_TYPE_PLACEHOLDER}
            required={this.props.required}
            value={this.props.value}
          />
          { (this.state.error && this.state.exited) && this.renderError(this.state.error) }
        </Form.Field>
      );
    }

    return component;
  }
}
ServiceType.propTypes = {
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default onClickOutside(ServiceType);
