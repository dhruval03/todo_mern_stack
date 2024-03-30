import { createSlice, configureStore  } from "@reduxjs/toolkit";

const  authSlice = createSlice({
    name: "auth",
    initialState: {user:"", islogined:false},
    reducers:{
        login(state){
            state.islogined = true;
        },
        logout(state){
            state.islogined = false;
        }
    },
});

export const authAction = authSlice.actions;

export const store = configureStore ({
    reducer:authSlice.reducer,
});