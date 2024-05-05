import AdCard from "../components/AdCard";
// import Additional from "../components/Additional";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedProductSection from "../components/FeaturedProductSection";
import ProductFruitCard from "../components/ProductFruitCard";
import PageHeader from "../components/PageHeader";
// import PriceRange from "../components/PriceRange";
import { getAllProducts } from "../features/product/product-slice";
import { useSelector } from "react-redux";
import { Product } from "../entities/api-util";

const Products = () => {
  const products = useSelector(getAllProducts);

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Products"} />
      {/* <!-- Fruits Shop Start--> */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh produce shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
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
                </div>
                <div className="col-6"></div>
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                    >
                      <option value="volvo">Nothing</option>
                      <option value="saab">Popularity</option>
                      <option value="opel">Organic</option>
                      <option value="audi">Fantastic</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <CategoriesSection />
                    {/* <PriceRange /> */}
                    {/* <Additional /> */}
                    <FeaturedProductSection />
                    <AdCard
                      adTextOne={"Open"}
                      adTextTwo={"For"}
                      adTextThree={"Ads"}
                    />
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {products.map((product: Product, index: number) => (
                      <ProductFruitCard
                        key={index}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        categoryId={product.categoryId}
                        imageUrl={product.imageUrl}
                        description={product.description}
                      />
                    ))}
                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a href="#" className="rounded">
                          &laquo;
                        </a>
                        <a href="#" className="active rounded">
                          1
                        </a>
                        <a href="#" className="rounded">
                          2
                        </a>
                        <a href="#" className="rounded">
                          &raquo;
                        </a>
                      </div>
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

export default Products;
