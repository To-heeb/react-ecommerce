import { generateRandomColor, getRandomInt } from "../utils/StringUtils";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
  return (
    <>
      {/* <!-- Tastimonial Start --> */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <TestimonialCard
              name={"Mike Adenuga"}
              profession={"Entrepreneur"}
              imageUrl={`https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Mike Adenuga"}`}
              starCount={getRandomInt(4, 5)}
              description={
                "I absolutely love this product! It has made my life so much easier. From the moment I started using it, I noticed a significant improvement in my daily routine. The quality is exceptional, and I appreciate the attention to detail in its design. Highly recommended to anyone looking for a reliable solution!"
              }
            />
            <TestimonialCard
              name={"Missy Whale"}
              profession={"Lawyer"}
              imageUrl={`https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Missy Whale"}`}
              starCount={getRandomInt(4, 5)}
              description={
                "Incredible service! The team went above and beyond to ensure I was satisfied with my purchase. From the initial inquiry to the final delivery, every step of the process was seamless. The product exceeded my expectations, and I'm impressed by its performance. I'll definitely be recommending it to my friends and family!"
              }
            />
            <TestimonialCard
              name={"John Doe"}
              profession={"Doctor"}
              imageUrl={`https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"John Doe"}`}
              starCount={getRandomInt(4, 5)}
              description={
                "I've tried many similar products, but none compare to this one. The attention to detail in its design is evident, and the quality is unmatched. It's clear that the team behind this product truly cares about customer satisfaction. I've been using it for a while now, and it has become an essential part of my daily routine. I can't imagine life without it!"
              }
            />
            <TestimonialCard
              name={"William Ashley"}
              profession={"Investor"}
              imageUrl={`https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"William Ashley"}`}
              starCount={getRandomInt(4, 5)}
              description={
                "Excellent customer support and top-notch quality. I was initially hesitant to make the purchase, but the team answered all my questions and addressed my concerns promptly. The product arrived on time and was exactly as described. I've been using it for a few weeks now, and I'm impressed by its durability and performance. Will definitely be a returning customer!"
              }
            />
          </div>
        </div>
      </div>
      {/* <!-- Tastimonial End --> */}
    </>
  );
};

export default TestimonialSection;
