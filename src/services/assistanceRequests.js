const API_ASSISTANCE_REQUESTS_URL = 'http://localhost:49567/api/assistance-requests';

const assistanceRequests = {};

assistanceRequests.create = (data) => {
  return fetch(API_ASSISTANCE_REQUESTS_URL, {
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'POST',
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Network error:', error);
    });
};

export default assistanceRequests;
