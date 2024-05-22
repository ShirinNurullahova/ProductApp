import { AxiosResponse } from "axios";
import { api } from "./api.config";

export const login = async (): Promise<AxiosResponse<User[]>> => api.get('/user');
export const getProducts = async (): Promise<AxiosResponse<Product[]>> => api.get('/products');
export const getProductById = async (id: string): Promise<AxiosResponse<Product>> => api.get(`/products/${id}`);
export const deleteProduct = async (id: string): Promise<AxiosResponse<Product>> => api.delete(`/products/${id}`);
export const addProduct = async (productData: Partial<Product>): Promise<AxiosResponse<Product>> => api.post('/products', productData);
export const editProduct = async (id: string, productData: Partial<Product>): Promise<AxiosResponse<Product>> => api.patch(`/products/${id}`, productData);
