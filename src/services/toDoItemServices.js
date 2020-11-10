import axios from "axios";

export const getToDoItems = async () => (await axios.get("http://localhost:8080/todo/get")).data