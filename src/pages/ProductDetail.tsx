import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getProductByIdData, getProductIdSelector } from "../redux/slices/productSlice";

const ProductDetail = () => {
  const currentProduct = useAppSelector(getProductIdSelector);
  const dispatch = useAppDispatch();
  const params = useParams<{ productId: string }>();

  useEffect(() => {
    if (params.productId) {
      dispatch(getProductByIdData(params.productId));
    }
  }, [params.productId, dispatch]);
  
 
  return (
    <div className="min-h-screen flex  bg-gray-100 dark:bg-gray-800 py-8 items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 items-center ">
        <div className="flex  md:flex-row -mx-4 h-full ">
          <div className="md:flex-1 px-4 mb-4 md:mb-0">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img className="w-full h-full object-cover" src={currentProduct?.images.url} alt="Product Image" />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{currentProduct?.title}</h2>
           
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-gray-600 dark:text-gray-300">{currentProduct?.productPrice}</span>
              </div>
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Sale Price:</span>
                <span className="text-gray-600 dark:text-gray-300">{currentProduct?.salePrice}</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {currentProduct?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
