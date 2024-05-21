import { useEffect, useMemo, useState } from "react"
import { getProducts } from "../services/api";
import ProductCards from "../components/clients/ProductCards";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>()
  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        setProducts(res.data)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    })();
  }, []);

  const publishedProducts = useMemo(()=>products?.filter(product => product.isPublish), [products]);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:max-w-none lg:py-24 ">
        <div className="mt-6  lg:grid lg:grid-cols-3">
          {publishedProducts?.map(product => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage