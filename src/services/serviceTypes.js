const API_SERVICE_TYPES_URL = 'http://localhost:49567/api/service-types';

const serviceTypes = {};

serviceTypes.fetchAll = () => {
  return fetch(API_SERVICE_TYPES_URL)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json.data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export default serviceTypes;
