import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        update: (state,action) => action.payload
    }
})

export const { update } = userSlice.actions

export default userSlice.reducer