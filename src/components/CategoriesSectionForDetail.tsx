import { useSelector } from "react-redux";
import { getAllCategories } from "../features/category/category-slice";
import { getAllProducts } from "../features/product/product-slice";
import { Category, Product } from "../entities/api-util";
import CategoryList from "./CategoryList";

const CategoriesSectionForDetail = () => {
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
        <div className="input-group w-100 mx-auto d-flex mb-4">
          <input
            type="search"
            className="form-control p-3"
            placeholder="keywords"
            aria-describedby="search-icon-1"
          />
          <span id="search-icon-1" className="input-group-text p-3">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="mb-4">
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

export default CategoriesSectionForDetail;
