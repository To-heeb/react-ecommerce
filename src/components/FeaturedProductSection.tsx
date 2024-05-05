import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProductSection = () => {
  return (
    <>
      <div className="col-lg-12">
        <h4 className="mb-3">Featured products</h4>
        <FeaturedProductCard
          name={"Big Banana"}
          oldPrice={2.99}
          newPrice={4.11}
          starCount={4}
          imageUrl={"/img/featur-1.jpg"}
        />
        <FeaturedProductCard
          name={"Big Banana"}
          oldPrice={2.99}
          newPrice={4.11}
          starCount={4}
          imageUrl={"/img/featur-2.jpg"}
        />
        <FeaturedProductCard
          name={"Big Banana"}
          oldPrice={2.99}
          newPrice={4.11}
          starCount={4}
          imageUrl={"/img/featur-3.jpg"}
        />
        <div className="d-flex justify-content-center my-4">
          <a
            href="#"
            className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
          >
            Vew More
          </a>
        </div>
      </div>
    </>
  );
};

export default FeaturedProductSection;
