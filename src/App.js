import React, { useState, useEffect } from 'react';
import './App.css';
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle, FaSearch } from 'react-icons/fa'; // Import icons
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import React Router components
import subscriptions from './components/Data';
import Cart from './components/Cart'; // Import Cart.js
import About from './components/About'; // Import About.js
import Movies from './components/Movies'; // Import Movies.js

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

function App() {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    saveCartToLocalStorage(cart); // Save cart to local storage whenever it changes
  }, [cart]);

  const addItemToCart = (subscription) => {
    if (cart.length > 0) {
      alert("You cannot add more than one subscription.");
      return;
    }
    setCart([...cart, { ...subscription, quantity: 1 }]); // Add new item with quantity 1
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Site Logo" className="site-logo" />
          </div>
          <ul className="navbar-links">
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/movies"><FaFilm /> Movies</Link></li>
            <li><Link to="/cart"><FaShoppingCart /> Cart ({cart.length})</Link></li>
            <li><Link to="/about"><FaInfoCircle /> About</Link></li>
          </ul>
          <div className="navbar-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
        </nav>

        <header className="App-header">
          <h1>Welcome to EZTech</h1>
          <p>Your favorite streaming service!</p>
        </header>

        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <div>
                <h2>Available Subscriptions</h2>
                <ul className="subscription-list">
                  {subscriptions.map((subscription) => (
                    <li key={subscription.id}>
                      <h3>{subscription.name}</h3>
                      <p>{subscription.description}</p>
                      <p>Price: ${subscription.price.toFixed(2)}</p>
                      <button onClick={() => addItemToCart(subscription)}>Add to Cart</button>
                    </li>
                  ))}
                </ul>
              </div>
            } />
            <Route path="/movies" element={<Movies cart={cart} setCart={setCart} />} /> {/* Movies page */}
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> {/* Cart page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
