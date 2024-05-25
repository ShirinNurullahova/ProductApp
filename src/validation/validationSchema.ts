
import * as yup from 'yup';

export const loginSchema = yup
    .object({
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    })
    .required();

export const manageProductSchema = yup
    .object({
        title: yup.string().min(3).required('Title is required'),
        description: yup.string().min(3).required('Description is required'),
        productPrice: yup.number().required('Product Price is required'),

    })
    .required();
