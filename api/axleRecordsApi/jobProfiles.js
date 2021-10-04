import request from '../baseRequest';

const getJobProfiles = (shopId, opts={}) => {
  return request({
    url: `/job_profiles?shop_id=${shopId}`,
    ...opts,
  });
}

const getJobProfileDetails = (id, opts={}) => {
  return request({
    url: `/job_profiles/${id}`,
    ...opts,
  });
}

const createJobProfile = async (data={}, opts={}) => {
  return request({
    method: 'post',
    url: 'job_profiles',
    data: {
      shop_id: data.shopId,
      job_id: data.jobId,
      price: data.price,
    },
    ...opts,
  });
}

const updateJobProfile = (id, data={}, opts={}) => {
  return request({
    method: 'patch',
    url: `/job_profiles/${id}`,
    data: {
      price: data.price
    },
    ...opts,
  });
}

const deleteJobProfile = (id, opts={}) => {
  return request({
    method: 'delete',
    url: `/job_profiles/${id}`,
    ...opts,
  });
}


module.exports = {
  getJobProfiles,
  getJobProfileDetails,
  createJobProfile,
  deleteJobProfile,
  updateJobProfile,
};

