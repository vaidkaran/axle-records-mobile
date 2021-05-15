import axios from 'axios';
import * as firebase from 'firebase';

const getBrands = async () => {
  const idtoken = await firebase.auth().currentUser.getIdToken();
  const opts = {
    url: 'https://axle-records-dev.herokuapp.com/vehicle_brands?test_mode=true',
    headers: {
      authorization: idtoken,
    },
  };
  return axios(opts);
};

const getModels = async (brandId) => {
  const idtoken = await firebase.auth().currentUser.getIdToken();
  const opts = {
    url: `https://axle-records-dev.herokuapp.com/vehicle_brands/${brandId}/vehicle_models?test_mode=true`,
    headers: {
      authorization: idtoken,
    },
  };
  return axios(opts);
};

module.exports = {
  getBrands,
  getModels,
};
