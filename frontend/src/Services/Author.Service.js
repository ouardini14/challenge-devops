import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthorsApi = createApi({
  reducerPath: 'AuthorsApi',
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
    getAllAuthors: builder.query({
      query: () =>{ 
       return{ 
        url: '/Authors',
        method: 'GET',
    }
      },
      providesTags: ['Authors'],
    }),
    getAllAuthorById: builder.query({
      query: (id) =>{ 
       return{ 
        url: '/Authors/'+id,
        method: 'GET',
    }
      },
      providesTags: ['Authors'],
    }),
    getAllAuthorsByName: builder.query({
      query: (name) =>{ 
       return{ 
        url: '/Authors/SearchAuthor/'+name,
        method: 'GET',
    }
      },
      providesTags: ['Authors'],
    }),
    addNewAuthor: builder.mutation({
        query: (payload) => ({
          url: '/Authors',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['Authors'],
      }),
      EditAuthor: builder.mutation({
        query: ({id,Author}) => ({
          url: `/Authors/${id}`,
          method: 'PUT',
          body: Author,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
      
       invalidatesTags: ['Authors'],
      }),
      deleteAuthor: builder.mutation({
        query: (id) => ({
          url: `/Authors/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Authors'],
      }),
  }),
})

export const {useEditAuthorMutation, useGetAllAuthorByIdQuery, useGetAllAuthorsByNameQuery , useAddNewAuthorMutation,useGetAllAuthorsQuery,useDeleteAuthorMutation } = AuthorsApi