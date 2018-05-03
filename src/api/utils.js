import axios from 'axios';

const extractData = response => {
  const milliseconds = 1000;
  return response.data.Data.map(obj => [obj.time * milliseconds, obj.close]);
};

export const get = async url => {
  let response, error;

  try {
    response = await axios.get(url);
  } catch (err) {
    error = err;
  }

  return response ? extractData(response) : error;
};
