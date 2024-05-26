import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deleteProductData, getProductsData, selectAllProducts } from "../redux/slices/productSlice";

const Admin = () => {
    const navigate = useNavigate();

    const products = useAppSelector(selectAllProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getProductsData());

    }, [dispatch]);

    const handleEdit = (id: string) => {
        navigate(`/edit/${id}`);
    };

    const addProduct = () => {
        navigate(`/addProduct`);
    };

    const handleDelete = async (id: string) => {
         dispatch(deleteProductData(id))
    };

    return (
        <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
            <section className="mb-20 text-gray-800">
                <div className="block rounded-lg shadow-lg bg-white">
                    <h1 className="text-2xl font-bold text-gray-900 my-2">ADMIN</h1>
                    <div className="flex items-end justify-end cursor-pointer" onClick={addProduct}>
                        <div className="mb-6 text-white w-[150px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ADD PRODUCT</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full mb-0">
                                        <thead className="border-b bg-gray-50 rounded-t-lg text-left">
                                            <tr>
                                                <th scope="col" className="rounded-tl-lg text-sm font-medium px-6 py-4">NAME</th>
                                                <th scope="col" className="text-sm font-medium px-6 py-4">TITLE</th>
                                                <th scope="col" className="text-sm font-medium px-6 py-4">Description</th>
                                                <th scope="col" className="text-sm font-medium px-6 py-4">Price</th>
                                                <th scope="col" className="text-sm font-medium px-6 py-4">IS PUBLISH</th>
                                                <th scope="col" className="rounded-tr-lg text-sm font-medium px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products && products.map((element) => (
                                                <tr className="border-b" key={element.id}>
                                                    <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                        <div className="flex flex-row items-center">
                                                            <img
                                                                className="rounded-full w-[100px] h-[100px]"
                                                                src={element.images.url}
                                                                alt="Avatar"
                                                            />
                                                        </div>
                                                    </th>
                                                    <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                        <div className="flex flex-col">
                                                            <p className="mb-0.5">{element.title}</p>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                        <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium ">{element.description}</span>
                                                    </td>
                                                    <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                        <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium ">{element.productPrice}</span>
                                                    </td>
                                                    <td className="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                        <div className="flex items-center justify-center mb-4">
                                                            <input defaultValue={+element.isPublish} id="default-checkbox" checked={element.isPublish} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-right text-sm font-normal px-6 py-4 whitespace-nowrap text-left cursor-pointer" onClick={() => handleEdit(element.id!)}>
                                                        <a className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out">Edit</a>
                                                    </td>
                                                    <td className="align-middle text-right text-sm font-normal px-6 py-4 whitespace-nowrap text-left cursor-pointer" onClick={() => handleDelete(element.id!)}>
                                                        <a className="font-medium text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out">Delete</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Admin;
