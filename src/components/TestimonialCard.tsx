import StarReview from "./StarReview";

interface TestimonialCardProps {
  name: string;
  profession: string;
  imageUrl: string;
  starCount: number;
  description: string;
}

const TestimonialCard = ({
  name,
  profession,
  imageUrl,
  starCount,
  description,
}: TestimonialCardProps) => {
  return (
    <>
      <div className="testimonial-item img-border-radius bg-light rounded p-4">
        <div className="position-relative">
          <i
            className="fa fa-quote-right fa-2x text-secondary position-absolute"
            style={{ bottom: "30px", right: "0" }}
          ></i>
          <div className="mb-4 pb-4 border-bottom border-secondary">
            <p className="mb-0">{description}</p>
          </div>
          <div className="d-flex align-items-center flex-nowrap">
            <div className="bg-secondary rounded">
              <img
                src={imageUrl}
                className="img-fluid rounded"
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
            </div>
            <div className="ms-4 d-block">
              <h4 className="text-dark">{name}</h4>
              <p className="m-0 pb-3">{profession}</p>
              <div className="d-flex pe-5">
                <StarReview starCount={starCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
