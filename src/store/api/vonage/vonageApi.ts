import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vonageApi = createApi({
  reducerPath: 'vonageApi',
  refetchOnFocus: true,
  keepUnusedDataFor: 90,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
