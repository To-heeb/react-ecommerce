import { useSelector } from "react-redux";
import { getAllProducts } from "../features/product/product-slice";
import VegetableCard from "./VegetableCard";
import { Product } from "../entities/api-util";
import ProductFruitCard from "./ProductFruitCard";

interface RelatedProductProps {
  currentProductId: string;
}

const RelatedProduct = ({ currentProductId }: RelatedProductProps) => {
  const products = useSelector(getAllProducts);

  const relatedProduct = products.filter(
    (product: Product) => product.id != currentProductId
  );
  return (
    <>
      <h1 className="fw-bold mb-0">Related products</h1>
      <div className="vesitable">
        <div className="owl-carousel vegetable-carousel justify-content-center">
          {relatedProduct.map((product: Product, index: number) => (
            <ProductFruitCard
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              categoryId={product.categoryId}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
