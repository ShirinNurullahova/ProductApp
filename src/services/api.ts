import { AxiosResponse } from "axios"
import { api } from "./api.config"

export const login = async (data: LoginBody
): Promise<AxiosResponse<User>> => api.get('/user')