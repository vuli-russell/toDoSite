import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        update: (state,action) => ({
            //can "directly" mutate state in the logic as in backgorund a new immutable state is being made and set.
            state: action.payload
        })
    }
})

export const { update } = userSlice.actions

export default userSlice.reducer