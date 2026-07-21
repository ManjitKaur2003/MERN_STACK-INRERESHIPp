async function getpost() {
    try {
        const response = await fetch('https://dummyjson.com/products/2');
        const data = await response.json();
        console.log('Product Details:', data);
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
}
getpost();

async function createPost() {
    try {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Product',
                price: 19.99,
                description: 'A test product'
            })
        });
        const data = await response.json();
        console.log('Created Product:', data);
    }
    catch (error) {
        console.error('Error creating product:', error);
    }
}
createPost();

async function updatePost() {
    try {
        const response = await fetch('https://dummyjson.com/products/2', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Updated Product',
                price: 29.99,
                description: 'An updated test product'
            })
        });
        const data = await response.json();
        console.log('Updated Product:', data);
    }
    catch (error) {
        console.error('Error updating product:', error);
    }
}
updatePost();

async function deletePost() {
    try {
        const response = await fetch('https://dummyjson.com/products/7', {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.log("product not found");
        } else {
            console.log('Product deleted successfully');
        }
    }
    catch (error) {
        console.error('Error deleting product:', error);
    }
}
deletePost();  
