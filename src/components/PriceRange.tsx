const PriceRange = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="mb-3">
          <h4 className="mb-2">Price</h4>
          <input
            type="range"
            className="form-range w-100"
            id="rangeInput"
            name="rangeInput"
            min="0"
            max="500"
            value="0"
            // onInput="amount.value=rangeInput.value"
          />
          <output
            id="amount"
            name="amount"
            // minValue={0}
            // maxValue={500}
            htmlFor="rangeInput"
          >
            0
          </output>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
