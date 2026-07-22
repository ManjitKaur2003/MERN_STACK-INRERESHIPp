import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Shoes", price: 100 },
  { id: 2, name: "Car", price: 200 },
  { id: 3, name: "Bike", price: 300 },
  { id: 4, name: "Phone", price: 400 },
  { id: 5, name: "Laptop", price: 500 },
];

function Products() {
  return (
    <div>
      <h1>Products</h1>
      {PRODUCTS.map((product) => (
        <div key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
