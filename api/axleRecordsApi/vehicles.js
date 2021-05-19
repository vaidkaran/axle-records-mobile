import request from '../baseRequest';

const getAllModels = async () => {
  return request({ url: `/all_vehicle_models` });
};

const getVariants = async (modelId) => {
  return request({ url: `/vehicle_models/${modelId}/vehicle_variants` });
};

module.exports = {
  getAllModels,
  getVariants,
};
