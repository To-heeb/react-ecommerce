import { Link } from "react-router-dom";

interface PageHeaderProps {
  homeName: string;
  homeLink: string;
  pageName: string;
}

const PageHeader = ({ homeName, homeLink, pageName }: PageHeaderProps) => {
  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{pageName}</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to={homeLink}>{homeName}</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">{pageName}</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End --> */}
    </>
  );
};

export default PageHeader;
