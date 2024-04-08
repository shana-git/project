import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice.js";
import eventApiSlice from "./slices/eventApiSlice.js";
import authSlice from "./slices/authSlice.js";
import personApiSlice from "./slices/personApiSlice.js";



const store = configureStore({
    reducer: {
        auth:authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

})

export default store