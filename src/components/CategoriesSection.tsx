import { useSelector } from "react-redux";
import CategoryList from "./CategoryList";
import { getAllCategories } from "../features/category/category-slice";
import { getAllProducts } from "../features/product/product-slice";
import { Product } from "../entities/api-util";

const CategoriesSection = () => {
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);

  const categoryWithProductCount = categories.map((category: Category) => {
    const count = products.filter(
      (product: Product) => product.categoryId == category.id
    ).length;
    return { ...category, count: count };
  });

  return (
    <>
      <div className="col-lg-12">
        <div className="mb-3">
          <h4>Categories</h4>
          <ul className="list-unstyled fruite-categorie">
            {categoryWithProductCount.map((category, index: number) => (
              <CategoryList
                key={index}
                id={category.id}
                name={category.name}
                count={category.count}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoriesSection;
