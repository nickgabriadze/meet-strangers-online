import { createSlice } from "@reduxjs/toolkit";

interface userSlice {
    username: string,
    inQueue: boolean,
    room: string
}

const initialState: userSlice = {
    username: "",
    inQueue: false,
    room: ""
}

export const uSlice = createSlice({
    name: "userSlice",
    initialState,

    reducers:{
        setUsername: (state, action) => {
            return {
                ...state,
                username: action.payload.u
            }
        },

        setInQueue: (state, action) => {
            return {
                ...state, 
                inQueue: action.payload.inQueue
            }
        },

        setRoom: (state, action) => {
            return {
                ...state,
                room: action.payload.room
            }
        }
    }
})

export const {setUsername, setInQueue, setRoom} = uSlice.actions;

export default uSlice.reducer;