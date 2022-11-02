import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const emapdataApi = createApi({
  reducerPath: 'emapdata/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://emapdata.adc4gis.com/'
  }),
  endpoints: build => ({
    searchZip: build.query({
      query: (zip) => ({
        url: `routes?`,
        params: {
          zips: zip,
        }
      }),
      transformResponse: (response) => response.items
    })
  })
})

export const {useSearchZipQuery, useLazySearchZipQuery} = emapdataApi