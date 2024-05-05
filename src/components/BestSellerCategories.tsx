import { useSelector } from "react-redux";
import { getAllCategories } from "../features/category/category-slice";
import BestSellerCategoryCard from "./BestSellerCategoryCard";
import { Category } from "../entities/api-util";
import { getRandomInt } from "../utils/StringUtils";

const BestSellerCategories = () => {
  const categories = useSelector(getAllCategories).slice(0, 5);
  return (
    <>
      <div className="container-fluid pb-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "700px" }}
          >
            <h1 className="display-4">Bestseller Categories</h1>
          </div>
          <div className="row g-4">
            {categories.map((category: Category, index: number) => (
              <BestSellerCategoryCard
                key={index}
                id={category.id}
                name={category.name}
                imageUrl={category.imageUrl}
                starCount={getRandomInt(3, 5)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerCategories;
