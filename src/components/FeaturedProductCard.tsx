interface FeaturedProductCardProps {
  name: string;
  imageUrl: string;
  oldPrice: number;
  newPrice: number;
  starCount: number;
}

const FeaturedProductCard = ({
  name,
  oldPrice,
  newPrice,
  starCount,
  imageUrl,
}: FeaturedProductCardProps) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-start">
        <div
          className="rounded me-4"
          style={{ width: "100px", height: "100px" }}
        >
          <img src={imageUrl} className="img-fluid rounded" alt="" />
        </div>
        <div>
          <h6 className="mb-2">{name}</h6>
          <div className="d-flex mb-2">
            {[...Array(starCount)].map((_, index) => (
              <i key={index} className="fa fa-star text-secondary"></i>
            ))}
            {[...Array(5 - starCount)].map((_, index) => (
              <i key={starCount + index} className="fa fa-star"></i>
            ))}
          </div>
          <div className="d-flex mb-2">
            <h5 className="fw-bold me-2">{newPrice} $</h5>
            <h5 className="text-danger text-decoration-line-through">
              {oldPrice} $
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProductCard;
