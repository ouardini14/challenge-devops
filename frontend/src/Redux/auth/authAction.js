import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':`Bearer ${process.env.REACT_APP_API_KEY}`
        },
      }
      await axios.post(
        `${process.env.REACT_APP_baseURL}/users`,
        user,
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const LoginUser = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':`Bearer ${process.env.REACT_APP_API_KEY}`
        },
      }
      const { data }=  await axios.post(
        `${process.env.REACT_APP_baseURL}/users/Login`,
        user,
        config
      )
      localStorage.setItem('userToken', data.accessToken)


      return data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

