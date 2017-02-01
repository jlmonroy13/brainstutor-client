import axios from 'axios';

const brainsAuthentication = axios.create({
  baseURL: 'https://brainsapi.herokuapp.com/',
});

const brains = axios.create({
  baseURL: 'https://brainsapi.herokuapp.com/',
});

brains.interceptors.request.use(config => (
  configBearerToken(config)
));

function configBearerToken(config) {
  const token = localStorage.getItem('BrainsToken');
  console.log(localStorage.getItem('BrainsToken'));
  console.log(token);
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  };
}

export {
  brains,
  brainsAuthentication
};
