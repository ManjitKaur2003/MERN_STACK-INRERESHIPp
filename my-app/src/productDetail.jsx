import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./products.css";

// Helper to render Category SVG Icon
const CategoryIcon = ({ category }) => {
  switch (category) {
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "laptop":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="12" y1="17" x2="12" y2="20" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
  }
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State for editing
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("phone");
  const [formStock, setFormStock] = useState("");

  // Load products list and current product
  useEffect(() => {
    const saved = localStorage.getItem("app_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProductsList(parsed);
      const found = parsed.find((p) => p.id === Number(id));
      if (found) {
        setProduct(found);
      } else {
        setErrorMsg("Product not found");
      }
    } else {
      setErrorMsg("No products in inventory");
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const updated = productsList.filter((p) => p.id !== product.id);
      localStorage.setItem("app_products", JSON.stringify(updated));
      navigate("/products");
    }
  };

  const openEditModal = () => {
    setFormName(product.name);
    setFormPrice(product.price);
    setFormDescription(product.description);
    setFormCategory(product.category);
    setFormStock(product.stock);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formName || !formPrice || !formStock) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedProduct = {
      ...product,
      name: formName,
      price: parseFloat(formPrice),
      description: formDescription,
      category: formCategory,
      stock: parseInt(formStock, 10),
    };

    const updatedList = productsList.map((p) =>
      p.id === product.id ? updatedProduct : p
    );

    setProduct(updatedProduct);
    setProductsList(updatedList);
    localStorage.setItem("app_products", JSON.stringify(updatedList));
    setIsModalOpen(false);
  };

  if (errorMsg) {
    return (
      <div style={{ padding: "40px 20px" }}>
        <div className="empty-state">
          <div className="empty-icon" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3>Product Not Found</h3>
          <p>The product you are trying to view does not exist in local storage or has been deleted.</p>
          <Link to="/products" className="btn-secondary" style={{ textDecoration: "none" }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "var(--code-bg)", minHeight: "100vh" }}>
      <div className="detail-container">
        {/* Back Link */}
        <Link to="/products" className="back-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Dashboard</span>
        </Link>

        {/* Product Detail Card */}
        <div className="detail-card">
          {/* Card Media Header */}
          <div className="detail-media">
            <CategoryIcon category={product.category} />
          </div>

          {/* Card Content Body */}
          <div className="detail-body">
            <div className="detail-header">
              <div className="detail-title-group">
                <span className="detail-category">{product.category}</span>
                <h1>{product.name}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: product.stock > 0 ? "#10b981" : "#ef4444",
                    }}
                  ></span>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: product.stock > 0 ? "var(--text)" : "#ef4444" }}>
                    {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="detail-price">₹{product.price.toLocaleString("en-IN")}</div>
            </div>

            {/* Description */}
            <div className="detail-description">
              <h3>Product Description</h3>
              <p>{product.description || "No description provided for this product."}</p>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button className="btn-primary" onClick={openEditModal}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Edit Details</span>
              </button>
              <button className="btn-secondary" style={{ borderColor: "rgba(239, 68, 68, 0.2)", color: "#ef4444" }} onClick={handleDelete}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Delete Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <div className="modal-form">
                  <div className="form-group-dash">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      className="form-input-dash"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group-dash">
                      <label>Price ($) *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-input-dash"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-dash">
                      <label>Stock Qty *</label>
                      <input
                        type="number"
                        min="0"
                        className="form-input-dash"
                        value={formStock}
                        onChange={(e) => setFormStock(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-dash">
                    <label>Category</label>
                    <select
                      className="form-select-dash"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                    >
                      <option value="phone">Phone</option>
                      <option value="laptop">Laptop</option>
                    </select>
                  </div>

                  <div className="form-group-dash">
                    <label>Description</label>
                    <textarea
                      className="form-textarea-dash"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
