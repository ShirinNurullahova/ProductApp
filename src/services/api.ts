import { AxiosResponse } from "axios"
import { api } from "./api.config"

export const login = async (): Promise<AxiosResponse<User[]>> => api.get('/user')
export const getProducts = async (): Promise<AxiosResponse<Product[]>> => api.get('/products')
export const getProductById = async (id: string): Promise<AxiosResponse<Product>> => api.get(`/products/${id}`)