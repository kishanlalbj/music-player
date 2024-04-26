import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (creds, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/auth/login`, creds)    
  
      
  
      if(res.data.success) {
        localStorage.setItem('musico_token', res.data.token)
  
        return res.data
      } else  {
        throw new Error(res.data.message)
      } 
  
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getCurrentUserAsync = createAsyncThunk("auth/currentUser", async (_, {rejectWithValue}) => {
    try {

      const res = await axios.get(`/auth/current-user`)

      return res.data
      
    } catch (error) {
      console.log({error})
      return rejectWithValue(error.response.data.message)
    }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggedIn: false,
    currentUser: null,
    error: null,

  },
  reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginAsync.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true
    })
    .addCase(loginAsync.rejected, (state) => {
      state.loading = false;
    }).addCase(getCurrentUserAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true
      state.currentUser = action.payload
    })
    .addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message
    })
  },
});

export const getAuth = state => state.auth

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
