import { createSlice } from "@reduxjs/toolkit";
import { getToDoItems } from "../services/toDoItemServices";


const toDoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        //for getting all items on load
        //reducers return the new value of state
        //can "directly" mutate state in the logic as in backgorund a new immutable state is being made and set.
        setToDoItems: (state,action) => (action.payload),
        
        //for reacting to db changes sent over socket
        //delete is dispatched with a document id as payload
        toDoItemDeleted: (state,action) => state.filter(item => item._id!==action.payload),

        //insert is dispatched with document to be added s payload
        toDoItemInserted:  (state,action) => ([...state,action.payload]),

        //update is dispatched with updated fields and  as payload
        toDoItemUpdated:  (state,action) => state.map(i => i._id === action.payload._id ? {...i,...action.payload.updatedFields} : i)
    }
})

export const { setToDoItems, toDoItemDeleted, toDoItemInserted, toDoItemUpdated} = toDoSlice.actions

export default toDoSlice.reducer

//thunks

export const fetchToDoItems = (userID) => {
    return async(dispatch) => {
        const toDoItems = (await getToDoItems(userID)).data
        dispatch(setToDoItems(toDoItems))
    }
}
