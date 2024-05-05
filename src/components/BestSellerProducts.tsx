import { useSelector } from "react-redux";
import { getAllProducts } from "../features/product/product-slice";
import BestSellerProductCard from "./BestSellerProductCard";
import { Product } from "../entities/api-util";
import { getRandomInt } from "../utils/StringUtils";

const BestSellerProducts = () => {
  const products = useSelector(getAllProducts).slice(0, 6);
  // Sort by whatever metrics you want

  return (
    <>
      {/* <!-- Bestsaler Product Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "700px" }}
          >
            <h1 className="display-4">Bestseller Products</h1>
          </div>
          <div className="row g-4">
            {products.map((product: Product, index: number) => (
              <BestSellerProductCard
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                starCount={getRandomInt(3, 5)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Bestsaler Product End --> */}
    </>
  );
};

export default BestSellerProducts;
