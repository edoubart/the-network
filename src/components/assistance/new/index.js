// React
import React from 'react';

// Semantic UI React
import { Button, Modal } from 'semantic-ui-react';

// Custom
import NewAssistanceForm from './form';

// Style
import './index.scss';

// Constants
const NEW_ASSISTANCE_BUTTON_LABEL = 'Request Assistance';
const NEW_ASSISTANCE_HEADER = 'New Assistance Request';

const newAssistance = (props) => (
  <Modal trigger={
    <div className='newAssistance'>
      <Button>{ NEW_ASSISTANCE_BUTTON_LABEL }</Button>
    </div>
  }>
    <Modal.Header>{ NEW_ASSISTANCE_HEADER }</Modal.Header>
    <Modal.Content>
      <NewAssistanceForm />
    </Modal.Content>
  </Modal>
);

export default newAssistance;
