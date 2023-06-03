import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getProducts = createAsyncThunk(
  'get/product',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Product", data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const postProduct = createAsyncThunk(
  "post/product",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const obj = {
        category_id: data.category_id,
        proBrand: data.proBrand,
        proContent: data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        proTurnOn: data.proTurnOn,
        isDelete: data.isDelete
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("file", data.featureImgPath);
      formData.append("json", JSON.stringify(obj));

      const response = await api.post("/api/Product", formData, config)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const putProducts = createAsyncThunk(
  "put/products",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data",data);

      let formData = new FormData();
      const dataEdit = {
        proId: data.proId,
        category_id: data.category_id,
        proBrand: data.proBrand,
        proContent:data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        proTurnOn: data.proTurnOn,
        createdAt: data.createdAt,
        isDelete:data.isDelete,
        updatedAt: data.date,
      };
      console.log(dataEdit)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (typeof data.featureImgPath === "string") {
        const dataEditNoImage = { ...dataEdit, featureImgPath: data.featureImgPath };
        formData.append("json", JSON.stringify(dataEditNoImage));
      } else {
        formData.append("file", data.featureImgPath);
        formData.append("json", JSON.stringify(dataEdit));
      }
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'delete/product',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Product/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const blockProducts = createAsyncThunk(
  "block/products",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        ...data,
        proTurnOn: data.proTurnOn === true ? false : true,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
