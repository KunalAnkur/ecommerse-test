import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  // Mocking product availability. In a real app, this would come from the API.
  const isAvailable = React.useMemo(() => Math.random() > 0.3, []);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top p-3" alt={product.title} height={300} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
              {product.title.substring(0, 25)}...
            </Link>
          </h5>
          <p className="card-text">{product.description.substring(0, 90)}...</p>
          <div className="mt-auto">
            <p className="lead fw-bold mb-0">$ {product.price}</p>
            <div className="my-2">
              <label htmlFor={`variant-${product.id}`} className="form-label">Variants</label>
              <select className="form-select form-select-sm" id={`variant-${product.id}`}>
                <option value="1">Default</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            {isAvailable ? (
              <div className="d-grid">
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="d-grid">
                <button className="btn btn-danger" disabled>
                  Out of Stock
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
