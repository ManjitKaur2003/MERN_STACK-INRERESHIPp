import { useSearchParams } from "react-router-dom";
const products = [
    { id: 1, name: "Shoes", price: 100 },
    { id: 2, name: "Car", price: 200 },
    { id: 3, name: "Bike", price: 300 },
    { id: 4, name: "Phone", price: 400 },
    { id: 5, name: "Laptop", price: 500 },
];

function ProductSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const filteredproducts = searchParams.get("maxPrice");
    return (
        <div>
            <h1>Products</h1>
            {products.map((product) => (
                <div key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </div>
            ))}
        </div>
    )
}
export default ProductSearch    