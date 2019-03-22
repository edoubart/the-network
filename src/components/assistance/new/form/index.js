// React
import React, { Component } from 'react';

// Semantic UI React
import { Button, Form, Message } from 'semantic-ui-react';

// Custom
import FirstNameField from './../../../../components/fields/FirstName';
import LastNameField from './../../../../components/fields/LastName';
import EmailField from './../../../../components/fields/Email';
import ServiceTypeField from './../../../../components/fields/ServiceType';
import DescriptionField from './../../../../components/fields/Description';
import LegalField from './../../../../components/fields/Legal';

// Style
import './index.scss';

// Service
import { assistanceRequests } from './../../../../services';

// Constants
const NEW_ASSISTANCE_FORM_BUTTON_LABEL = 'Get Assistance';
const STATUS_CODE_CREATED = 201;

class NewAssistanceForm extends Component {
  // Local state
  state = {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      serviceType: '',
      description: '',
      legal: false
    },
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      serviceType: false,
      description: false
    },
    submitting: false,
    submitted: false,
    positiveResponse: false,
    responseMessage: ''
  };

  // Handlers
  handleChange = (name, value, error = false) => {
    const currentState = this.state;

    return () => {
      this.setState({
        ...currentState,
        values: {
          ...currentState.values,
          [name]: value
        },
        errors: {
          ...currentState.errors,
          [name]: error
        }
      });
    };
  };

  hasError = () => {
    let error;

    if (this.state.errors.firstName
      || this.state.errors.lastName
      || this.state.errors.email
      || this.state.errors.serviceType
      || this.state.errors.description) {
      error = true;
    } else {
      error = false;
    }

    return error;
  }

  hasValues = () => {
    let values;

    if (this.state.values.firstName
      && this.state.values.lastName
      && this.state.values.email
      && this.state.values.serviceType
      && this.state.values.legal) {
      values = true;
    } else {
      values = false;
    }

    return values;
  }

  isValid = () => {
    let valid;

    if (this.hasValues() && !this.hasError()) {
      valid = true;
    } else {
      valid = false;
    }

    return valid;
  }

  onSubmit = () => {
    this.setState({ submitting: true });

    const data = {
      assistance_request: {
        contact: {
          first_name: this.state.values.firstName,
          last_name: this.state.values.lastName,
          email: this.state.values.email
        },
        service_type: this.state.values.serviceType,
        description: this.state.values.description
      }
    };

    let statusCode;
    assistanceRequests.create(data)
      .then(response => {
        statusCode = response.status;

        return response.json();
      })
      .then(data => {
        this.setState({
          submitting: false,
          submitted: true,
          positiveResponse: statusCode === STATUS_CODE_CREATED ? true : false,
          responseMessage: data.message
        });
      })
      .catch(error => {
        this.setState({ submitting: false });

        console.error('Network error:', error);
      });
  };

  // Renderers
  renderMessage() {
    let color = this.state.positiveResponse === true ? 'green' : 'red';

    return <Message color={color}>{ this.state.responseMessage }</Message>
  }

  render() {
    return (
      <Form className='newAssistanceForm' onSubmit={this.onSubmit} error>
        <FirstNameField
          handleChange={this.handleChange}
          required
          value={this.state.values.firstName}
         />
        <LastNameField
          handleChange={this.handleChange}
          required
          value={this.state.values.lastName}
        />
        <EmailField
          handleChange={this.handleChange}
          required
          value={this.state.values.email}
        />
        <ServiceTypeField
          handleChange={this.handleChange}
          required
          value={this.state.values.serviceType}
        />
        <DescriptionField
          handleChange={this.handleChange}
          value={this.state.values.description}
        />
        <LegalField
          handleChange={this.handleChange}
          required
          value={this.state.values.legal}
        />
        <Button
          disabled={!this.isValid()}
          floated='right'
          loading={this.props.performing}
          positive
          type='submit'>
          { NEW_ASSISTANCE_FORM_BUTTON_LABEL }
        </Button>
        { this.state.submitted && this.renderMessage() }
      </Form>
    );
  }
}

export default NewAssistanceForm;
