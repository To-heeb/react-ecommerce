const DiscountCard = () => {
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <a href="#">
          <div className="service-item bg-dark rounded border border-dark">
            <img
              src="img/featur-2.jpg"
              className="img-fluid rounded-top w-100"
              alt=""
            />
            <div className="px-4 rounded-bottom">
              <div className="service-content bg-light text-center p-4 rounded">
                <h5 className="text-primary">Tasty Fruits</h5>
                <h3 className="mb-0">Free delivery</h3>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default DiscountCard;
