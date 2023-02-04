import { configureStore } from "@reduxjs/toolkit";
import   uSlice  from "./userSlice";


const store = configureStore({
    reducer: {
        uReducer:  uSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;