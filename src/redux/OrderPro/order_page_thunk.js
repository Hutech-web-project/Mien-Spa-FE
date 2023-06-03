import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const postOrderPro = createAsyncThunk(
  "post/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/OrdersPro", data);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const putOrderPro = createAsyncThunk(
  "put/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await api.put(`/api/OrdersPro/${data.orProId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getOrderProduct = createAsyncThunk(
  'get/ordersPro',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/OrdersPro", data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const getOrderProDetail = createAsyncThunk(
  "get/orderProdetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrderProDetail/${data}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);