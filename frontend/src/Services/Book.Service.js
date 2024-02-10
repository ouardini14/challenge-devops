import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BooksApi = createApi({
  reducerPath: 'BooksApi',
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
    getAllBooks: builder.query({
      query: (arg) =>{ 
        const { filter,sort,select,start,qt,genres } = arg;
       return{ 
        url: '/Books',
        method: 'GET',
        params: { filter,sort,select,start,qt,genres },
    }
      },
    /*  serializeQueryArgs: ({ endpointName }) => {
      //  console.log(endpointName)
        return endpointName
      },
      merge: (currentCacheData, newItems,) => {
        currentCacheData.push(...newItems)
      },
      forceRefetch({ currentArg, previousArg }) {
       // console.log(currentArg , previousArg)
        return currentArg != previousArg
      },*/
      providesTags: ['Books'],
    }),
    getRatedBooks: builder.query({
      query: (arg) =>{ 
        const { select,qt } = arg;
       return{ 
        url: '/Books/MostRated',
        method: 'GET',
        params: {select,qt },
    }
      },
      providesTags: ['Books'],
    }),
    getAuthorBooks: builder.query({
      query: (arg) =>{ 
        const { start,qt,id } = arg;
       return{ 
        url: '/Books/Author',
        method: 'GET',
        params: { id,start,qt },
    }
      },
      providesTags: ['Books'],
    }),
    getAllBooksByName: builder.query({
      query: (name) =>{ 
       return{ 
        url: '/Books/SearchBook/'+name,
        method: 'GET',
    }
      },
      providesTags: ['Books'],
    }),
    getBook: builder.query({
      query: (id) =>{ 
       return{ 
        url: '/Books/Book/'+id,
        method: 'GET',
    }
      },
      providesTags: ['Books'],
    }),
    addBookVisit: builder.query({
      query: (id) =>{ 
      return{ 
        url: '/Books/AddVisit/'+id,
        method: 'GET',
    }
      },
    }),
    getBookUrl: builder.query({
      query: (id) =>{ 
       return{ 
        url: '/Books/BookUrl/'+id,
        method: 'GET',
    }
      },
      providesTags: ['Books'],
    }),
    addNewBook: builder.mutation({
        query: (payload) => ({
          url: '/Books',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        //invalidatesTags: ['Books'],
      }),
      EditBook: builder.mutation({
        query: ({id,Book}) => ({
          url: '/Books/Book/'+id,
          method: 'PUT',
          body: Book,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
      
       invalidatesTags: ['Books'],
      }),
      AddScore: builder.mutation({
        query: ({id,score}) => ({
          url: '/Books/AddScore/'+id,
          method: 'POST',
          body: {score},
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['Books','User'],
      }),
      AddReview: builder.mutation({
        query: ({id,review}) => ({
          url: '/Books/AddReview/'+id,
          method: 'POST',
          body: review,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['Books'],
      }),
      deleteBook: builder.mutation({
        query: (id) => ({
          url: `/Books/Book/${id}`,
          method: 'DELETE',
        }),
      }),

  }),
})

export const {useDeleteBookMutation,useAddBookVisitQuery, useGetAuthorBooksQuery , useGetRatedBooksQuery,useGetBookUrlQuery,useGetAllBooksByNameQuery ,useGetAllBooksQuery,useAddNewBookMutation,useEditBookMutation,useGetBookQuery,useAddScoreMutation ,useAddReviewMutation} = BooksApi