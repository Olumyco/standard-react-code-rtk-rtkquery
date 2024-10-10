import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './request';
import tagTypes from './tagTypes';

const setHeaders = () => {
    const token = 'a' // get token from where it is kept;

    if (token) {
        return {
            Authorization: `Bearer ${token}`
        };
    } else {
        return {};
    }
};

const authBaseApi = createApi({
    reducerPath: 'authBaseApi',
    baseQuery: axiosBaseQuery({
        baseUrl: '',
        headers: setHeaders()
    }),
    tagTypes: tagTypes.authBaseApi,
    endpoints: () => ({})
});

export default authBaseApi;