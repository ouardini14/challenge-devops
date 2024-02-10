import { configureStore } from '@reduxjs/toolkit'
import { AdminsApi } from '../Services/Admin.Service'
import { authApi } from '../Services/Auth'
import { AuthorsApi } from '../Services/Author.Service'
import { BooksApi } from '../Services/Book.Service'
import { userApi } from '../Services/User.Service'
import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [AuthorsApi.reducerPath]: AuthorsApi.reducer,
    [AdminsApi.reducerPath]: AdminsApi.reducer,
    [BooksApi.reducerPath]: BooksApi.reducer,
    [userApi.reducerPath]: userApi.reducer


  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware,AuthorsApi.middleware,AdminsApi.middleware,BooksApi.middleware,userApi.middleware])
      ,

})
export default store