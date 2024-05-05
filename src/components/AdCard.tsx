interface AdCardProps {
  adTextOne: string;
  adTextTwo: string;
  adTextThree: string;
}

const AdCard = ({ adTextOne, adTextTwo, adTextThree }: AdCardProps) => {
  return (
    <>
      <div className="col-lg-12">
        <div className="position-relative">
          <img
            src="/img/banner-fruits.jpg"
            className="img-fluid w-100 rounded"
            alt=""
          />
          <div
            className="position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          >
            <h3 className="text-secondary fw-bold">
              {adTextOne} <br />
              {adTextTwo} <br />
              {adTextThree}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCard;
