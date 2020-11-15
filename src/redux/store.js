import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import todosReducer from "./toDoSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        todos: todosReducer
    } 
})


export default store