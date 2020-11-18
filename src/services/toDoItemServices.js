import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.REACT_APP_API_URL

export const getToDoItems = async (userID) => {
    try{
        return await axios.get(`${url}todo/get?user=${userID}`)
    }catch (error){
        return error
    }
}

export const addToDoItem = async(document) => {
    try{
        return await axios.post(`${url}todo/post/`,{...document}) 
    } catch (error){
        return error
    }
}

export const updateToDoItem = async(document) => {
    try{
        return await axios.put(`${url}todo/put`, {...document})
    }catch(error){
        return error
    }
} 

export const deleteToDoItem = async(_id) => {
    try{
        return await axios.delete(`${url}todo/delete/`,{data: {_id: _id}})
    }catch(error){
        return error
    }
}

