import { useEffect} from "react"
import ProductCards from "../components/clients/ProductCards";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getProductsData, selectPublishedProducts } from "../redux/slices/productSlice";

const ProductPage = () => {
const products = useAppSelector(selectPublishedProducts)
const dispatch = useAppDispatch();

  useEffect(() => {
       dispatch(getProductsData())
  }, []);


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:max-w-none lg:py-24 ">
        <div className="mt-6  lg:grid lg:grid-cols-3">
          {products?.map(product => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage