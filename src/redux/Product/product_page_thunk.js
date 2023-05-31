import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getProducts = createAsyncThunk(
    'get/product',
    async (data,{rejectWithValue})=>{
        try {
            const response = await api.get("/api/Product", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const postProducts = createAsyncThunk(
    'post/product',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.post("/api/Product", data)
          return response.status
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const putProducts = createAsyncThunk(
    'put/product',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.put(`/api/product`, data)
           
          return response.status
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteProducts = createAsyncThunk(
    'delete/product',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.delete(`/api/Product/${data}`)  
          return response.status
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
