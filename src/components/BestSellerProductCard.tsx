import { Link } from "react-router-dom";
import StarReview from "./StarReview";
import useAddToCart from "../hooks/useAddToCart";
import Swal from "sweetalert2";

interface BestSellerProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  starCount: number;
}

const BestSellerProductCard = ({
  id,
  name,
  price,
  imageUrl,
  starCount,
}: BestSellerProductCardProps) => {
  const addToCart = useAddToCart();

  const handleAddToCartClick = (e: Event) => {
    e.preventDefault();

    addToCart({
      userId: "",
      productId: id,
      price: price,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added to cart",
      showConfirmButton: false,
      timer: 1300,
    });
  };
  return (
    <>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img
                src={imageUrl}
                className="img-fluid me-5 rounded-circle"
                alt=""
              />
            </div>
            <div className="col-6">
              <Link to={`/products/${id}`} className="h5">
                {name}
              </Link>
              <StarReview starCount={starCount} />
              <h4 className="mb-3">${price}</h4>
              <p
                className="btn border border-secondary rounded-pill px-3 text-primary"
                onClick={(e) => handleAddToCartClick(e)}
              >
                <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to
                cart
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerProductCard;
