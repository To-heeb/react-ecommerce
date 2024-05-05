import { useSelector } from "react-redux";
import VegetableCard from "./VegetableCard";
import { getAllCategories } from "../features/category/category-slice";
import { getAllProducts } from "../features/product/product-slice";
import { Product } from "../entities/api-util";

const VegetableSection = () => {
  const categories = useSelector(getAllCategories);

  const products = useSelector(getAllProducts);

  const categoryId = categories.find(
    (category: Role) => category.name == "Vegetables"
  ).id;

  const vegetables = products.filter((product: Product) => {
    return product.categoryId == categoryId;
  });

  return (
    <>
      {/* <!-- Vesitable Shop Start--> */}
      <div className="container-fluid vesitable py-5">
        <div className="container py-5">
          <h2 className="mb-0 d-flex text-left">Fresh Organic Vegetables</h2>
          <div className="owl-carousel vegetable-carousel justify-content-center">
            {vegetables.map((vegetable: Product, index: number) => (
              <VegetableCard
                key={index}
                name={vegetable.name}
                price={vegetable.price}
                imageUrl={vegetable.imageUrl}
                description={vegetable.description}
                id={vegetable.id}
              />
            ))}
            {/* <VegetableCard /> */}
          </div>
        </div>
      </div>
      {/* <!-- Vesitable Shop End --> */}
    </>
  );
};

export default VegetableSection;
