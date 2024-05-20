import axios from 'axios'



export const api = axios.create({
  baseURL: "http://localhost:3000",
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})