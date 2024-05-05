interface StarReviewProps {
    starCount: number;
}

const StarReview = ({ starCount}: StarReviewProps) => {
  return (
    <>
      <div className="d-flex my-3">
        {[...Array(starCount)].map((_, index) => (
          <i key={index} className="fas fa-star text-primary"></i>
        ))}
        {[...Array(5 - starCount)].map((_, index) => (
          <i key={starCount + index} className="fas fa-star"></i>
        ))}
      </div>
    </>
  );
};

export default StarReview;
