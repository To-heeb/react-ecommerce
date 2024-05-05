import { useSelector } from "react-redux";
import FruitCard from "./FruitCard";
import { Category, Product } from "../entities/api-util";
import { getAllCategories } from "../features/category/category-slice";
import { getAllProducts } from "../features/product/product-slice";
import { useState } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtils";

const FruitSection = () => {
  const categories = useSelector(getAllCategories);

  const allProducts = useSelector(getAllProducts);

  const [products, setProducts] = useState<Product[]>(allProducts);

  const handleProductFilterByCategory = (categoryId: string) => {
    setProducts(() => {
      const filteredProduct = allProducts.filter((product: Product) => {
        if (categoryId == "*") {
          return product;
        } else {
          return product.categoryId == categoryId;
        }
      });
      console.log(filteredProduct);

      return filteredProduct;
    });
  };

  return (
    <>
      {/* <!-- Fruits Shop Start--> */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li
                    className="nav-item"
                    onClick={() => handleProductFilterByCategory("*")}
                  >
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill active"
                      data-bs-toggle="pill"
                      href="#tab-1"
                    >
                      <span className="text-dark" style={{ width: "130px" }}>
                        All Products
                      </span>
                    </a>
                  </li>
                  {categories.map((category: Category, index: number) => (
                    <li
                      key={index}
                      className="nav-item"
                      onClick={() => handleProductFilterByCategory(category.id)}
                    >
                      <a
                        className="d-flex py-2 m-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#"
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          {capitalizeFirstLetter(category.name)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products.map((product: Product, index: number) => (
                        <FruitCard
                          id={product.id}
                          key={index}
                          name={product.name}
                          price={product.price}
                          imageUrl={product.imageUrl}
                          description={product.description}
                          categoryId={product.categoryId}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Fruits Shop End--> */}
    </>
  );
};

export default FruitSection;
