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
  const userInfo = JSON.parse(localStorage.getItem('BrainsUserInfo'));
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${userInfo.token}`
    }
  };
}

export {
  brains,
  brainsAuthentication
};
