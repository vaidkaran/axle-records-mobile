import request from '../baseRequest';

const create_or_sign_in = async (idtoken, opts = {}) => {
  return request({
    method: 'post',
    data: {
      idtoken,
    },
    url: '/users/create_or_sign_in',
    authHeaders: false,
    ...opts,
  });
};

module.exports = {
  create_or_sign_in,
};
