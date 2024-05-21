import { useNavigate } from "react-router-dom";

interface CardProps {
    product: Product
}

const ProductCards = ({ product }: CardProps) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/productDetails/${product.id}`)
    };
    return (
        <>
            {product && (
                <div onClick={handleCardClick} >
                    <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
                    <div className="my-10 mx-2 space-y-12  lg:grid lg:grid-cols-1">
                        <div className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img
                                    key={product.images.public_id}
                                    src={product.images.url}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-500">
                                <a>
                                    <span className="absolute inset-0"></span>
                                    {product.description}
                                </a>
                            </h3>
                            <p className="text-base font-semibold text-gray-900">{product.productPrice} $</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCards;
