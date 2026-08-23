import './App.css';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '₹2,499',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '₹3,999',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: '₹1,299',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: '₹2,199',
    category: 'Fashion',
  },
];

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>ShopEasy</h1>
        <div className="nav-right">
          <span>Home</span>
          <span>Products</span>
          <span>Cart 🛒</span>
        </div>
      </nav>

      <section className="hero">
        <h2>Welcome to ShopEasy</h2>
        <p>Simple, fast and reliable online shopping.</p>
        <button>Shop Now</button>
      </section>

      <section className="products">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                🛍️
              </div>

              <p className="category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>

              <button className="cart-button">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>ShopEasy eCommerce Application</p>
        <p>Deployed using Jenkins • Docker • Kubernetes • AWS EKS</p>
      </footer>
    </div>
  );
}

export default App;