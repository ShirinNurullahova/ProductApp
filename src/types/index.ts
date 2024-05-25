interface LoginBody{
    email: string;
    password: string;
}
interface User {
    email: string;
    password: string;
    role: "admin" | "user";
    id: string;
  }
  interface Product{
    id?: string;
    title: string;
    description: string;
    isPublish : boolean;
    productPrice: number;
    salePrice?: number;
    images: { url: string; public_id: string };
  }

   type TodoInfo = Omit<Product, "isPublish" | "productPrice" | "salePrice" | "images" | "id">;
