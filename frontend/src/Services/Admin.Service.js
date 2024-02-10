import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AdminsApi = createApi({
  reducerPath: 'AdminsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+"/users",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)  
      }
      headers.set('x-api-key', `Bearer ${process.env.REACT_APP_API_KEY}`)  

      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () =>{ 
       return{ 
        url: '/Admin',
        method: 'GET',
    }
      },
      providesTags: ['Admins'],
    }),
    addNewAdmin: builder.mutation({
        query: (payload) => ({
          url: '/Admin',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['Admins'],
      }),
      deleteAdmin: builder.mutation({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Admins'],
      }),

  
  }),
})

export const { useAddNewAdminMutation,useGetAllAdminsQuery,useDeleteAdminMutation } = AdminsApi