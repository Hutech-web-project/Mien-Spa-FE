import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getServices = createAsyncThunk(
    'get/Service',
    async (data,{rejectWithValue})=>{
        try {
            const response = await api.get("/api/Serce", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

// export const postServices = createAsyncThunk(
//     'post/Service',
//     async (data,{rejectWithValue}) => {
//         try {
//           const response = await api.post("/api/Serce", data)
//           return response.data
//         } catch (err) {
//           return rejectWithValue(err.message);
//         }
//       }
//   );

export const postServices = createAsyncThunk(
  "post/service",
  async (data, { rejectWithValue }) => {
    console.log("data", data)
    try {
      let formData = new FormData();
      const obj = {
        createdAt: data.createdAt,
        // seId: data.seId,
        seName: data.seName,
        sePrice: data.sePrice,
        seDescription: data.seDescription,
        seNote: data.seNote,
        seTurnOn: data.seTurnOn,
        isDelete: data.isDelete,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("file", data.seImage);
      formData.append("json", JSON.stringify(obj));

      const response = await api.post("/api/Serce", formData, config);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


  // export const putServices = createAsyncThunk(
  //   'put/Service',
  //   async (data,{rejectWithValue}) => {
  //       try {
  //         const response = await api.put(`/api/Serce/${data.cateId}`, data)
           
  //         return response.data
  //       } catch (err) {
  //         return rejectWithValue(err.message);
  //       }
  //     }
  // );

  export const deleteServices = createAsyncThunk(
    'delete/Service',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.delete(`/api/Serce/${data}`)
          return response.status
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const putServices = createAsyncThunk(
    'put/Service',
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const dataEdit = {
          seId: data.seId,
          seName: data.seName,
          sePrice: data.sePrice,
          seDescription: data.seDescription,
          seNote: data.seNote,
          seImage: data.seImage,
          seTurnOn: data.seTurnOn,
          isDelete: data.isDelete,
          createdAt: data.createdAt,
          updatedAt: data.date,
        };
  
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        if (typeof data.seImage === "string") {
          const dataEditNoImage = { ...dataEdit, seImage: data.seImage };
          formData.append("json", JSON.stringify(dataEditNoImage));
        } else {
          formData.append("file", data.seImage);
  
          formData.append("json", JSON.stringify(dataEdit));
        }
        const response = await api.put(
          `/api/Serce/${dataEdit.seId}`,
          formData,
          config
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
