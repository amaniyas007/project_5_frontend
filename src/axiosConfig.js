import axios from "axios";

export const quizConfig = axios.create({
    baseURL : "http://localhost:8000/api/v1"
    
}) 