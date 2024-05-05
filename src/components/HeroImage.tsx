import { Link } from "react-router-dom";

interface HeroImageProps {
  id: string;
  name: string;
  counter: number;
  imageUrl: string;
}
const HeroImage = ({ id, name, counter, imageUrl }: HeroImageProps) => {
  return (
    <>
      <div className={`carousel-item rounded ${counter === 0 ? "active" : ""}`}>
        <img
          src={imageUrl}
          className="img-fluid w-100 h-100 rounded"
          alt="Second slide"
        />
        <Link
          to={`/categories/${id}`}
          className="btn px-4 py-2 text-white rounded"
        >
          {name}
        </Link>
      </div>
    </>
  );
};

export default HeroImage;
