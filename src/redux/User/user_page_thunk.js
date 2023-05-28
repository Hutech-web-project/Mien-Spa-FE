export const getAllUser = createAsyncThunk(
    "get/allUser",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.get("/api/Users", data);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const postUser = createAsyncThunk(
    "post/user",
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const obj = {
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          usId: data.usId,
          usUserName: data.usUserName,
          usPassword: null,
          usDob: data.usDob,
          usAddress: data.usAddress,
          usPhoneNo: data.usPhoneNo,
          usEmailNo: data.usEmailNo,
          usNote: data.usNote,
          isAdmin: false,
          isDelete: data.isDelete,
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        console.log("typeof data.usImage", typeof data.usImage);
        if (typeof data.usImage === "object") {
          formData.append("file", data.usImage);
          formData.append("data_json", JSON.stringify(obj));
        } else {
          const responseUser = await api.get(`/api/Users/${data.usId}`);
          formData.append(
            "data_json",
            JSON.stringify({ ...obj, usImage: responseUser.data.usImage })
          );
        }
  
        const response = await api.put(`/api/Users`, formData, config);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const updatePassword = createAsyncThunk(
    "update/password",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
  
      try {
        let formData = new FormData();
        const obj = {
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          usId: data.usId,
          usUserName: data.usUserName,
          usPassword: data.usPassword,
          usDob: data.usDob,
          usAddress: data.usAddress,
          usPhoneNo: data.usPhoneNo,
          usEmailNo: data.usEmailNo,
          usNote: data.usNote,
          isAdmin: false,
          isDelete: data.isDelete,
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        console.log("typeof data.usImage", typeof data.usImage);
        if (typeof data.usImage === "object") {
          formData.append("file", data.usImage);
          formData.append("data_json", JSON.stringify(obj));
        } else {
          const responseUser = await api.get(`/api/Users/${data.usId}`);
          formData.append(
            "data_json",
            JSON.stringify({ ...obj, usImage: responseUser.data.usImage })
          );
        }
  
        const response = await api.put(`/api/Users`, formData, config);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const getUserById = createAsyncThunk(
    "get/userById",
    async (data, { rejectWithValue }) => {
      try {
        const responseUser = await api.get(`/api/Users/${data}`);
        if (responseUser.data.usImage === null) {
          return responseUser.data;
        } else {
          const response = await api.get(
            `/image/user/${responseUser.data.usImage}`
          );
          const base64Response = await fetch(
            `data:image/jpeg;base64,${response.data}`
          );
          const blob = await base64Response.blob();
          const base64 = await convertBase64(blob);
          const result = { ...responseUser.data, usImage: base64 };
          return result;
        }
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const getUserByIdAdmin = createAsyncThunk(
    "get/userByIdAdmin",
    async (data, { rejectWithValue }) => {
      try {
        const responseUser = await api.get(`/api/Users/${data}`);
        if (responseUser.data.usImage === null) {
          return responseUser.data;
        } else {
          const response = await api.get(
            `/image/user/${responseUser.data.usImage}`
          );
          const base64Response = await fetch(
            `data:image/jpeg;base64,${response.data}`
          );
          const blob = await base64Response.blob();
          const base64 = await convertBase64(blob);
          const result = { ...responseUser.data, usImage: base64 };
          return result;
        }
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );