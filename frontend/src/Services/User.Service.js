import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL,
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
    getUserBooks: builder.query({
      query: () =>{ 
       return{ 
        url: '/users/LibraryIds',
        method: 'GET',
    }
      },
      providesTags: ['BookLibrary'],

    }),
    getUserLibrary: builder.query({
      query: (arg) =>{ 
        const { start,qt } = arg;
       return{ 
        url: '/users/Library',
        method: 'GET',
        params: { start,qt},
    }
      },
      providesTags: ['BookLibrary'],

    }),
    AddToLibrary: builder.mutation({
      query: (BookId) => ({
        url: '/users/Library',
        method: 'POST',
        body: {BookId:BookId},
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['BookLibrary'],

    }),
    RemoveFromLibrary: builder.mutation({
        query: (BookId) => ({
          url: '/users/Library',
          method: 'DELETE',
          body: {BookId:BookId},
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['BookLibrary'],

    })

  }),
})

export const {useGetUserLibraryQuery, useAddToLibraryMutation ,useRemoveFromLibraryMutation,useGetUserBooksQuery} = userApi