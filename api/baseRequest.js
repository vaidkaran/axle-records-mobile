import * as firebase from 'firebase';
import axios from 'axios';
import qs from 'qs';
const env = process.env.NODE_ENV || 'dev';

const getBaseUrl = () => {
  let env = 'dev'; // default (if no NODE_ENV)

  if (process.env.NODE_ENV) {
    // react native has it as "development"
    env = process.env.NODE_ENV === 'development' ? 'dev' : process.env.NODE_ENV;
  }
  return `https://axle-records-${env}.herokuapp.com`;
};

// supports fullRes=true
// supports authHeaders with default true
const request = async (opts = {}) => {
  const authHeaders = opts.authHeaders || true;
  if (!opts.url.match('^/')) {
    // prepend / in path if not present
    opts.url = '/' + opts.url;
  }
  const qsParams = qs.stringify(opts.qs, { addQueryPrefix: true });
  let headers;
  if(authHeaders){
    const idtoken = await firebase.auth().currentUser.getIdToken();
    headers = Object.assign({}, { authorization: idtoken }, opts.headers);
  } else {
    headers = opts.headers;
  }
  const reqOpts = {
    method: opts.method || 'get',
    url: getBaseUrl() + opts.url + qsParams,
    headers,
  };
  if (opts.data) reqOpts.data = opts.data;

  const res = await axios(reqOpts);

  if (opts.fullRes) return res;
  return res.data; // return only response body
};

module.exports = request;
