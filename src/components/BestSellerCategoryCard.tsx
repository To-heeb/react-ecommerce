import { Link } from "react-router-dom";
import StarReview from "./StarReview";

interface BestSellerCategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
  starCount: number;
}

const BestSellerCategoryCard = ({
  id,
  name,
  imageUrl,
  starCount,
}: BestSellerCategoryCardProps) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center position-relative">
          <img src={imageUrl} className="img-fluid rounded" alt="" />
          <div
            className="text-white bg-while px-3 py-1 rounded position-absolute"
            style={{ top: "10px", left: "10px" }}
          >
            <StarReview starCount={starCount} />
          </div>
          <div className="py-2">
            <Link to={`/categories/${id}`} className="h5">
              {name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerCategoryCard;
