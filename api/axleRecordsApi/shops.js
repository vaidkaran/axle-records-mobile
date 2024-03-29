import request from '../baseRequest';

const getShops = (opts={}) => {
  return request({
    url: '/shops',
    ...opts,
  });
}

const getShopDetails = (id, opts={}) => {
  return request({
    url: `/shops/${id}`,
    ...opts,
  });
}

const createShop = (data={}, opts={}) => {
  return request({
    method: 'post',
    url: 'shops',
    data: {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      pin: data.pin,
      country: data.country,
    },
    ...opts,
  });
}

const updateShop = (id, data={}, opts={}) => {
  return request({
    method: 'patch',
    url: `/shops/${id}`,
    data: {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      pin: data.pin
    },
    ...opts,
  });
}

const deleteShop = (id, opts={}) => {
  return request({
    method: 'delete',
    url: `/shops/${id}`,
    ...opts,
  });
}


module.exports = {
  getShops,
  createShop,
  updateShop,
  deleteShop,
  getShopDetails,
};

