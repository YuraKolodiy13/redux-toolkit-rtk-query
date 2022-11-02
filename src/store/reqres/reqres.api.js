import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const reqresApi = createApi({
  reducerPath: 'reqres/api',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9001/'
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({page, itemsPerPage}) => ({
        url: 'users',
        params: {
          _page: page,
          _limit: itemsPerPage
        }
      }),
      providesTags: (result) =>  ['Users'],
      // providesTags: (result) => ['Users']
      //   ? [...result.data?.map(({id}) => ({type: 'Users', id})), {type: 'Users', id: 'LIST'}]
      //   : [{type: 'Users', id: 'LIST'}],
      transformResponse(response, meta) {
        return {data: response, totalCount: Number(meta.response.headers.get('X-Total-Count'))}
      }
    }),
    getUser: build.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users']
      // invalidatesTags: [{type: 'Users', id: 'LIST'}]
    }),
    removeUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
      // invalidatesTags: [{type: 'Users', id: 'LIST'}]
    }),
    getFaq: build.query({
      query: () => ({
        url: 'faq',
      }),
    })

  }),
})

export const {useGetUsersQuery, useGetUserQuery, useCreateUserMutation, useRemoveUserMutation, useGetFaqQuery} = reqresApi;