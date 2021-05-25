import request from '../baseRequest';

const getAllModels = async () => {
  return request({ url: `/all_vehicle_models` });
};

const getVariants = async (modelId) => {
  return request({ url: `/vehicle_models/${modelId}/vehicle_variants` });
};

const getVehicles = async () => {
  return request({ url: '/vehicles' });
};

const createVehicle = async (name, vehicleVariantId) => {
  return request({
    method: 'post',
    url: '/vehicles',
    data: { name, vehicle_variant_id: vehicleVariantId },
  });
};

const udpateVehicle = async (id, name) => {
  return request({
    method: 'patch',
    url: `/vehicles/${id}`,
    data: { name },
  });
};

module.exports = {
  getAllModels,
  getVariants,
  getVehicles,
  createVehicle,
};
