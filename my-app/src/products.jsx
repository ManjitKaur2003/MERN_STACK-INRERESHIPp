import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./products.css";

// Default Seed Products (Phones and Laptops only - INR Prices)
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 139900,
    description: "Premium Apple iOS smartphone with 256GB storage, OLED screen, and triple camera.",
    category: "phone",
    stock: 14,
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: 114900,
    description: "13-inch lightweight Apple laptop with M3 chip, 8GB RAM, and 256GB SSD storage.",
    category: "laptop",
    stock: 8,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 129900,
    description: "Premium Android smartphone with 512GB storage, Galaxy AI features, and integrated S-Pen.",
    category: "phone",
    stock: 5,
  },
  {
    id: 4,
    name: "Dell XPS 15 Laptop",
    price: 189900,
    description: "High-performance creator laptop with Core i7 processor, 16GB RAM, and 512GB SSD.",
    category: "laptop",
    stock: 4,
  },
  {
    id: 5,
    name: "Google Pixel 8 Pro",
    price: 93900,
    description: "Flagship Google smartphone with advanced camera systems and pure Android interface.",
    category: "phone",
    stock: 9,
  },
  {
    id: 6,
    name: "ThinkPad X1 Carbon",
    price: 169900,
    description: "Premium business ultrabook with lightweight carbon-fiber chassis, 16GB RAM, and secure chip.",
    category: "laptop",
    stock: 6,
  },
];

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

function Products() {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("phone");
  const [formStock, setFormStock] = useState("");

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("app_products");
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        const hasLegacyOrUSD = parsed.some(
          (p) => (p.category !== "phone" && p.category !== "laptop") || p.price < 5000
        );
        if (hasLegacyOrUSD) {
          localStorage.setItem("app_products", JSON.stringify(DEFAULT_PRODUCTS));
          setProducts(DEFAULT_PRODUCTS);
        } else {
          setProducts(parsed);
        }
      } catch (e) {
        localStorage.setItem("app_products", JSON.stringify(DEFAULT_PRODUCTS));
        setProducts(DEFAULT_PRODUCTS);
      }
    } else {
      // Seed default data
      localStorage.setItem("app_products", JSON.stringify(DEFAULT_PRODUCTS));
      setProducts(DEFAULT_PRODUCTS);
    }
  }, []);

  // Sync to local storage on changes
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("app_products", JSON.stringify(updatedProducts));
  };

  // Metrics calculations
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;
  const totalInventoryValue = products.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.stock), 0);
  const uniqueCategories = [...new Set(products.map((p) => p.category))].length;

  // Filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormPrice("");
    setFormDescription("");
    setFormCategory("electronics");
    setFormStock("");
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
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

    if (editingProduct) {
      // Edit mode
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formName,
              price: parseFloat(formPrice),
              description: formDescription,
              category: formCategory,
              stock: parseInt(formStock, 10),
            }
          : p
      );
      saveProducts(updated);
    } else {
      // Create mode
      const newProduct = {
        id: Date.now(),
        name: formName,
        price: parseFloat(formPrice),
        description: formDescription,
        category: formCategory,
        stock: parseInt(formStock, 10),
      };
      saveProducts([...products, newProduct]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Product Center</span>
          </div>

          <div className="navbar-user">
            {user && (
              <>
                <span className="navbar-user-greeting">Welcome, <strong>{user.name}</strong></span>
                <button className="navbar-logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Content Header */}
        <header className="content-header">
          <div className="header-title">
            <h2>Products Inventory</h2>
            <p>Total Products: {totalProducts} | Categories: {uniqueCategories}</p>
          </div>
        </header>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {["all", "phone", "laptop"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${categoryFilter === cat ? "active" : ""}`}
                onClick={() => setSearchParams(cat === "all" ? {} : { category: cat })}
              >
                {cat === "all" ? "All Items" : cat === "phone" ? "Phones" : "Laptops"}
              </button>
            ))}
          </div>
        </section>

        {/* Inventory Table */}
        {filteredProducts.length > 0 ? (
          <div className="table-responsive">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info-cell">
                        <span className="product-table-name" style={{ fontWeight: "600", fontSize: "15px", color: "var(--text-h)" }}>
                          {product.name}
                        </span>
                        <span className="product-table-desc">{product.description || "No description provided."}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`category-tag ${product.category}`}>
                        {product.category}
                      </span>
                    </td>
                    <td>₹{product.price.toLocaleString("en-IN")}</td>
                    <td>
                      <span className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Products Found</h3>
            <p>We couldn't find any phones or laptops matching your query.</p>
            <button className="btn-secondary" onClick={() => { setSearchQuery(""); setSearchParams({}); }}>
              Reset Filters
            </button>
          </div>
        )}
      </main>

    </div>
  );
}

export default Products;
