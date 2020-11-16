import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

//change before deploy
// const url = "https://vuli-todo-list-api.herokuapp.com/"
const url = "http://localhost:8080/"

export const fetchToDoItems = (userID) => {
    return async(dispatch) => {
        const toDoItems = (await axios.get(`${url}todo/get?user=${userID}`)).data
        dispatch(toDoItemsLoaded(toDoItems))
    }
}
