import { ProductCard } from "./Productcard.jsx";
import "./App.css";
import products from "./data.js";
import { useState } from "react";


function App() {
  const filter = [... new Set(products.map(e => e.brand))]

  // console.log(filter);
  // array of product in cart
  const [cartitem, Setcartitem] = useState([]);

  //  wishlist array of products ids thats are wishlisted
  const [wishlist, Setwishlist] = useState([]);

  // Theme state
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // search what user type in the search box
  const [searchterm, Setsearchterm] = useState('');

  //  brand filter what brand is selected (all mean show all)
  const [selectbrand, Setselectbrand] = useState('all');

  //  sort how to sorrt products
  const [sortby, Setsortby] = useState('');

  // cart sidebar state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // function to update quantity
  const updateQuantity = (productId, change) => {
    Setcartitem(cartitem.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + change };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };




  function checkcart(product) {
    // check if cart item exesist
    const itemexeist = cartitem.find(item => item.id === product.id)
    if (itemexeist) {
      // product is their
      Setcartitem(cartitem.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    }
    else {
      //  product not their
      Setcartitem([...cartitem, { ...product, quantity: 1 }])
    }
  }


  //  calculate total number of cart items
  const cartcount = cartitem.reduce((acc, value) => acc + value.quantity, 0)
  console.log(cartcount);

  // calculate total price
  const carttotal = cartitem.reduce((acc, value) => acc + (value.price) * (value.quantity), 0)

  // wishlist function

  function onTogglewishlist(productid) {
    if (wishlist.includes(productid)) {
      // already exeist just remove it
      Setwishlist(wishlist.filter(id => id != productid))
    } else {
      // not in the wishlist just add it
      Setwishlist([...wishlist, productid])
    }
  }

  // step 1 filter based on search //base on brand 

  let filterproduct = products.filter(product => {
    let searchmatch = product.name.toLowerCase().includes(searchterm.toLowerCase()) || product.brand.toLowerCase().includes(searchterm.toLowerCase())
    let brandmatch = selectbrand === 'all' ? true : product.brand === selectbrand;
    return searchmatch && brandmatch;
  })

  // sort products
  if (sortby === 'price-low') {
    filterproduct.sort((a, b) => a.price - b.price);
  } else if (sortby === 'price-high') {
    filterproduct.sort((a, b) => b.price - a.price);
  } else if (sortby === 'rating') {
    filterproduct.sort((a, b) => b.rating - a.rating);
  }










  return (


    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="nav-btn">Sign In</button>
            <div className="nav-btn theme-toggle" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-elevated)', padding: '0.5rem', borderRadius: '50%', margin: '10px', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid var(--border)', width: '40px', height: '40px' }}>
              {theme === 'dark' ? '☼' : '⏾'}
            </div>
            <div className="nav-btn  wishlist-btn  " style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid var(--border)' }}>
              <div className="" style={{ position: 'relative', fontSize: '1.2rem' }}>
                ❤️
                {wishlist.length > 0 && (
                  <span className="wishlist-count " style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '0.2rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Wishlist</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{wishlist.length} Items</span>
              </div>
            </div>
            <div className="nav-btn cart-btn" onClick={() => setIsCartOpen(!isCartOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid var(--border)' }}>
              <div style={{ position: 'relative', fontSize: '1.2rem' }}>
                🛒
                {cartcount > 0 && (
                  <span className="cart-count" style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {cartcount}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '0.2rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>₹{carttotal.toLocaleString('en-IN')}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cartcount} Items</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">70K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">300+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        <div className="filters-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchterm}
            onChange={(e) => Setsearchterm(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', minWidth: '200px' }}
          />
          <select
            value={selectbrand}
            onChange={(e) => Setselectbrand(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Brands</option>
            {filter.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
          <select
            value={sortby}
            onChange={(e) => Setsortby(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="product-grid">
          {filterproduct.map((elem) => (
            <ProductCard
              key={elem.id}
              name={elem.name}
              image={elem.image}
              price={elem.price}
              originalPrice={elem.originalPrice}
              discount={elem.discount}
              rating={elem.rating}
              isBestSeller={elem.isBestSeller}
              id={elem.id}
              iswishlisted={wishlist.includes(elem.id)}
              onAddtocart={() => checkcart(elem)}
              onTogglewishlist={() => onTogglewishlist(elem.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 TechStore. All rights reserved.</p>
      </footer>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>Your Cart</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items-container">
          {cartitem.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            cartitem.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-sidebar-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{carttotal.toLocaleString('en-IN')}</span>
          </div>
          <button className="checkout-btn" disabled={cartitem.length === 0}>Proceed to Checkout</button>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
}

export default App;