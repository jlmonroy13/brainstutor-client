import { brains } from '../utils/requests';
import Alert from 'react-s-alert';

const applyPromoCodeRequest= (code) => {
  return brains
    .post(`students/coupons/apply?code=${code}`)
    .catch(catchRequestErrorApplyCode);
};

const getPromoCodesRequest = () => {
  return brains
    .get(`/students/coupons`)
    .catch(catchRequestError);
};


function catchRequestError({ response }) {
  const errorMsg = response.data.error && response.data.error.user_authentication[0];
  Alert.error(errorMsg);
}

function catchRequestErrorApplyCode({ response }) {
  const errorMsg = response.data.error && response.data.error.coupon[0];
  Alert.error(errorMsg);
}

export {
  applyPromoCodeRequest,
  getPromoCodesRequest,
};
