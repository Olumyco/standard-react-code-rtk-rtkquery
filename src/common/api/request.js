import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 20000,
    headers: {
        'Authorization': 'abc'
    }
});

axiosInstance.interceptors.request.use(
    request => {
        // do something
        return request;
    },
    error => {
        // do something
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        // do something
        return response;
    },
    error => {
        // do something
        return Promise.reject(error);
    }
);


const axiosBaseQuery = ({ baseUrl, headers } = { baseUrl: '', headers: {} }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ 
        url,
        baseURL: baseUrl, 
        method, 
        data, 
        params,
        headers 
      });

      return { 
        data: result.data 
      };
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        }
      }
    }
  }

export { axiosInstance, axiosBaseQuery };