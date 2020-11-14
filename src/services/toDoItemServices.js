import axios from "axios";

export const getToDoItems = async (userID) => {
    try{
        return await axios.get(`http://localhost:8080/todo/get?user=${userID}`)
    }catch (error){
        return error
    }
}

export const addToDoItem = async(document) => {
    try{
        return await axios.post("http://localhost:8080/todo/post/",{...document}) 
    } catch (error){
        return error
    }
}

export const updateToDoItem = async(document) => {
    try{
        return await axios.put("http://localhost:8080/todo/put", {...document})
    }catch(error){
        return error
    }
} 

export const deleteToDoItem = async(_id) => {
    try{
        return await axios.delete("http://localhost:8080/todo/delete/",{data: {_id: _id}})
    }catch(error){
        return error
    }
}

