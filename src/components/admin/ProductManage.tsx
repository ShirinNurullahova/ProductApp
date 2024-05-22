import { useEffect, useState } from "react";
import { addProduct, editProduct, getProductById } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const ProductManage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Product>({ title: '', description: '', productPrice: 0, images: {url: '', public_id: ''}, isPublish: false });
  const params = useParams<{ productId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.productId) {
      setLoading(true);
      getProductById(params.productId)
        .then(res => {
          setFormData({
            ...res.data
          });
        })
        .catch(error => console.error('Error fetching product:', error))
        .finally(() => setLoading(false));
    }
  }, [params.productId]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  const handleImageChange = (e) => {
    const { id, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: { url:value}
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.productId) {
        await editProduct(params.productId, formData);
      } else {
        await addProduct(formData);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input
            type="text"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
            id="description"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input
            type="text"
            id="productPrice"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload images</label>
          <input
            className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="images"
            type="text"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-3 mb-5">
          <span>Is Publish</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="isPublish"
              className="sr-only peer"
              checked={formData.isPublish}
              onChange={handleInputChange}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {params.productId ? 'Edit' : 'Add'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductManage;
