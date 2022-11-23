import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const reqresApi = createApi({
  reducerPath: 'reqres/api',
  tagTypes: ['Users', 'Posts'],
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
    editUser: build.mutation({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
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
    }),
    getPosts: build.query({
      query: ({page, itemsPerPage}) => ({
        url: 'posts',
        params: {
          _page: page,
          _limit: itemsPerPage
        }
      }),
      providesTags: (result) =>  ['Posts'],
      transformResponse(response, meta) {
        return {data: response, totalCount: Number(meta.response.headers.get('X-Total-Count'))}
      }
    }),
    getPost: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
    }),
    editPost: build.mutation({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    removePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts']
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    getPostComments: build.query({
      query: (id) => ({
        url: `posts/${id}/comments`,
      }),
    })
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
  useEditUserMutation,
  useGetFaqQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useCreatePostMutation,
  useRemovePostMutation,
  useGetPostCommentsQuery,
} = reqresApi;