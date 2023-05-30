import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'
// import { convertBase64 } from "../../util/custom";


export const login = createAsyncThunk(
    "auth/login",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/login/signin', data.dataLogin);
            if(response_auth.status === 200){
                if(data.checkOut === true){
                    localStorage.setItem("ck",1)
                    localStorage.setItem("token",response_auth.data.accessToken);
                    localStorage.setItem("refreshToken",response_auth.data.refreshToken);
                    localStorage.setItem("uId",response_auth.data.id);
                }else{           
                    sessionStorage.setItem("token",response_auth.data.accessToken);
                    sessionStorage.setItem("refreshToken",response_auth.data.refreshToken);
                    sessionStorage.setItem("uId",response_auth.data.id);
                }   
            }
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/login/signup', data.dataRegister);
            return response_auth.status;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)
