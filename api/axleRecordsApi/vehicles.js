import request from '../baseRequest';

const getAllModels = async () => {
  return request({url: `/all_vehicle_models`});
};

module.exports = {
  getAllModels,
};
