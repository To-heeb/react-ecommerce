const Additional = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="mb-3">
          <h4>Additional</h4>
          <div className="mb-2">
            <input
              type="radio"
              className="me-2"
              id="Categories-1"
              name="Categories-1"
              value="Beverages"
            />
            <label htmlFor="Categories-1"> Organic</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              className="me-2"
              id="Categories-2"
              name="Categories-1"
              value="Beverages"
            />
            <label htmlFor="Categories-2"> Fresh</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              className="me-2"
              id="Categories-3"
              name="Categories-1"
              value="Beverages"
            />
            <label htmlFor="Categories-3"> Sales</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              className="me-2"
              id="Categories-4"
              name="Categories-1"
              value="Beverages"
            />
            <label htmlFor="Categories-4"> Discount</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              className="me-2"
              id="Categories-5"
              name="Categories-1"
              value="Beverages"
            />
            <label htmlFor="Categories-5"> Expired</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Additional;
