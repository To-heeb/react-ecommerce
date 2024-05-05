const FeatureCard = () => {
  return (
    <>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fa fa-phone-alt fa-3x text-white"></i>
          </div>
          <div className="featurs-content text-center">
            <h5>24/7 Support</h5>
            <p className="mb-0">Support every time fast</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
