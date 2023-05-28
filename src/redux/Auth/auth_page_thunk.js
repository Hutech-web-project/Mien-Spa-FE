import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'
// import { convertBase64 } from "../../util/custom";


export const login = createAsyncThunk(
    "auth/login",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/login/signin', data.dataLogin);
            if(data.checkOut === true){
                localStorage.setItem("token",response_auth.data.accessToken);
                localStorage.setItem("refreshToken",response_auth.data.refreshToken);
                localStorage.setItem("refreshToken",response_auth.data.refreshToken);
            }else{           
                sessionStorage.setItem("token",response_auth.data.accessToken);
                sessionStorage.setItem("refreshToken",response_auth.data.refreshToken);
            }   
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

// export const fetchUserById = createAsyncThunk(
//     "fetch/userById",
//     async (data, { rejectWithValue }) => {
//       try {
//         const responseUser = await api.get(`/api/Users/${data}`);
//         if (responseUser.data.usImage === null) {
//           return responseUser.data;
//         } else {
//           const response = await api.get(
//             `/image/user/${responseUser.data.usImage}`
//           );
//           const base64Response = await fetch(
//             `data:image/jpeg;base64,${response.data}`
//           );
//           const blob = await base64Response.blob();
//           const base64 = await convertBase64(blob);
//           const result = { ...responseUser.data, usImage: base64 };
//           return result;
//         }
//       } catch (err) {
//         return rejectWithValue(err.message);
//       }
//     }
//   );