import { useSelector } from "react-redux";
import AdCard from "../components/AdCard";
import CategoriesSectionForDetails from "../components/CategoriesSectionForDetail";
import FeatureProductSectionFromDetail from "../components/FeatureProductSectionFromDetail";
import PageHeader from "../components/PageHeader";
import RelatedProduct from "../components/RelatedProduct";
import { Cart, Category, Product } from "../entities/api-util";
import { useNavigate, useParams } from "react-router";
import { getAllProducts } from "../features/product/product-slice";
import { useEffect } from "react";
import { getAllCategories } from "../features/category/category-slice";
import useRemoveFromCart from "../hooks/useRemoveFromCart";
import useAddToCart from "../hooks/useAddToCart";
import { getAllCarts } from "../features/cart/cart-slice";
import { useAppSelector } from "../app/hooks";

const ProductDetails = () => {
  let { productId } = useParams();

  const navigate = useNavigate();
  const carts = useSelector(getAllCarts);
  const products = useSelector(getAllProducts);
  const categories = useSelector(getAllCategories);
  const removeFromCart = useRemoveFromCart();
  const addToCart = useAddToCart();
  const product = products.find((product: Product) => product.id == productId);

  const userId = useAppSelector((state) => state.account.id);
  const userCartProducts = carts.find(
    (cart: Cart) => cart.userId == userId
  )?.products;
  const currCartProduct = userCartProducts.find(
    (product: Product) => product.id == productId
  );
  console.log(currCartProduct);
  useEffect(() => {
    if (product == undefined) {
      navigate(`/product/${productId}`);
    }
  }, [navigate, product, productId]);

  const categoryName = categories.find(
    (category: Category) => category.id == product.categoryId
  ).name;

  const handleAddToCartClick = (e: MouseEvent) => {
    e.preventDefault();

    addToCart({
      userId: "",
      productId: product.id,
      price: product.price,
    });
  };

  const handleRemoveFromCartClick = (e: MouseEvent) => {
    e.preventDefault();

    removeFromCart({
      userId: "",
      productId: product.id,
      price: product.price,
    });
  };

  return (
    <>
      <PageHeader
        homeName={"Home"}
        homeLink={"/"}
        pageName={"Product Details"}
      />

      {/* <!-- Single Product Start --> */}
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      <img
                        src={product.imageUrl}
                        className="img-fluid rounded"
                        alt="Image"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product.name}</h4>
                  <p className="mb-3">Category: {categoryName}</p>
                  <h5 className="fw-bold mb-3">${product.price}</h5>
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p className="mb-4">{product.description}</p>
                  <div
                    className="input-group quantity mb-5"
                    style={{ width: "100px" }}
                  >
                    <div
                      className="input-group-btn"
                      onClick={(e) => handleRemoveFromCartClick(e)}
                    >
                      <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <div className="form-control form-control-sm text-center border-0 bg-white">
                      {currCartProduct.quantity}
                    </div>
                    <div
                      className="input-group-btn"
                      onClick={(e) => handleAddToCartClick(e)}
                    >
                      <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <p
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    onClick={(e) => handleAddToCartClick(e)}
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </p>
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-about"
                        aria-controls="nav-about"
                        aria-selected="true"
                      >
                        Description
                      </button>
                      <button
                        className="nav-link border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-mission-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-mission"
                        aria-controls="nav-mission"
                        aria-selected="false"
                      >
                        Reviews
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className="tab-pane active"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <p>{product.description}</p>
                      <div className="px-2">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">1 kg</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Country of Origin</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Agro Farm</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Quality</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Organic</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Сheck</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Healthy</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Min Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">250 Kg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane"
                      id="nav-mission"
                      role="tabpanel"
                      aria-labelledby="nav-mission-tab"
                    >
                      <div className="d-flex">
                        <img
                          src="/img/avatar.jpg"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: "100px", height: "100px" }}
                          alt=""
                        />
                        <div className="">
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Jason Smith</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                          <p>
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc. Susp endisse ultricies
                            nisi vel quam suscipit
                          </p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <img
                          src="/img/avatar.jpg"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: "100px", height: "100px" }}
                          alt=""
                        />
                        <div className="">
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                            <div className="d-flex mb-3">
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star text-secondary"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                          <p className="text-dark">
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc. Susp endisse ultricies
                            nisi vel quam suscipit
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="nav-vision" role="tabpanel">
                      <p className="text-dark">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        et tempor sit. Aliqu diam amet diam et eos labore. 3
                      </p>
                      <p className="mb-0">
                        Diam dolor diam ipsum et tempor sit. Aliqu diam amet
                        diam et eos labore. Clita erat ipsum et lorem et sit
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#">
                  <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="text"
                          className="form-control border-0 me-4"
                          placeholder="Yur Name *"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="email"
                          className="form-control border-0"
                          placeholder="Your Email *"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="border-bottom rounded my-4">
                        <textarea
                          name=""
                          id=""
                          className="form-control border-0"
                          cols={30}
                          rows={8}
                          placeholder="Your Review *"
                          spellCheck={false}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div
                            className="d-flex align-items-center"
                            style={{ fontSize: "12px" }}
                          >
                            <i className="fa fa-star text-muted"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                        >
                          Post Comment
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <CategoriesSectionForDetails />
                <FeatureProductSectionFromDetail />
                <AdCard
                  adTextOne={"Fresh"}
                  adTextTwo={"Produce"}
                  adTextThree={"Available"}
                />
              </div>
            </div>
          </div>
          <RelatedProduct currentProductId={product.id} />
        </div>
      </div>
      {/* <!-- Single Product End --> */}
    </>
  );
};

export default ProductDetails;
