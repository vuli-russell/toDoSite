import { createSlice } from "@reduxjs/toolkit";
import { getToDoItems } from "../services/toDoItemServices";

const toDoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        toDoItemsLoaded: (state,action) => ({
            //can "directly" mutate state in the logic as in backgorund a new immutable state is being made and set.
            state: action.payload
        })
    }
})

export const { toDoItemsLoaded } = toDoSlice.actions

export default toDoSlice.reducer

//thunks
export const fetchToDoItems = (userID) => {
    return async(dispatch) => {
        const toDoItems = (await getToDoItems(userID)).data
        dispatch(toDoItemsLoaded(toDoItems))
    }
}
