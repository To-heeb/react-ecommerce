import { Link } from "react-router-dom";

interface CategoryListProps {
  id: string;
  name: string;
  count: number;
}

const CategoryList = ({ id, name, count }: CategoryListProps) => {
  return (
    <>
      <li>
        <div className="d-flex justify-content-between fruite-name">
          <Link to={`/categories/${id}`}>
            <i className="fas fa-apple-alt me-2"></i>
            {name}
          </Link>
          <span>({count})</span>
        </div>
      </li>
    </>
  );
};

export default CategoryList;
