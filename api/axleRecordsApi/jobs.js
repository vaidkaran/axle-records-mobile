import request from '../baseRequest';

const getJobs = (opts={}) => {
  return request({
    url: '/jobs',
    ...opts,
  });
}

const getJobDetails = (id, opts={}) => {
  return request({
    url: `/jobs/${id}`,
    ...opts,
  });
}

const createJob = (data={}, opts={}) => {
  return request({
    method: 'post',
    url: 'jobs',
    data: {
      name: data.name,
      description: data.description,
    },
    ...opts,
  });
}

const updateJob = (id, data={}, opts={}) => {
  return request({
    method: 'patch',
    url: `/jobs/${id}`,
    data: {
      name: data.name,
      description: data.description,
    },
    ...opts,
  });
}

module.exports = {
  getJobs,
  createJob,
  updateJob,
  getJobDetails,
};

