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

const addSiteRole = (roleName, opts={}) => {
  let site_role_id;
  if (roleName === 'customer') {
    site_role_id = 2;
  } else if (roleName === 'vendor') {
    site_role_id = 3;
  } else {
    console.error('Incorrect site role name passed from screen');
    return;
  }

  return request({
    method: 'patch',
    url: '/users/self/add_site_role',
    data: { site_role_id },
    ...opts,
  });
};

const getUserInfo = (opts={}) => {
  return request({
    url: '/users/self',
    ...opts,
  });
}

module.exports = {
  create_or_sign_in,
  addSiteRole,
  getUserInfo,
};
