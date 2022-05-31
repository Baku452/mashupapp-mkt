const axios = require('axios').default;
export default function getUserbyId(id) {
  const options = {
    method: 'GET',
    url: 'https://dev-r3pcavyk.us.auth0.com/api/v2/users',
    params: {q: 'email:"jane@exampleco.com"', search_engine: 'v3'},
    headers: {authorization: `Bearer YOUR_MGMT_API_ACCESS_TOKEN`},
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
