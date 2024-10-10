import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './request';
import tagTypes from './tagTypes';

const unauthBaseApi = createApi({
    reducerPath: 'unauthBaseApi',
    baseQuery: axiosBaseQuery({
        baseUrl: ''
    }),
    tagTypes: tagTypes.unauthBaseApi,
    endpoints: () => ({})
});

export default unauthBaseApi;