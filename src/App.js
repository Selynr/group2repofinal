import React, { useState } from 'react';
import './App.css'; 
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle, FaSearch } from 'react-icons/fa'; // Import icons
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import React Router components
import subscriptions from './components/Data';
import Cart from './components/Cart'; // Make sure Cart.js exists
import About from './components/About'; // Make sure About.js exists

function App() {
  const [cart, setCart] = useState([]); // Initialize cart state

  const addItemToCart = (subscription) => {
    const exists = cart.find((item) => item.id === subscription.id);
    if (!exists) {
      setCart([...cart, subscription]);
    } else {
      alert("You cannot add more than one subscription.");
    }
  };

  return (
    <Router> {/* Wrap the entire app with Router */}
      <div className="App">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Site Logo" className="site-logo" />
          </div>
          <ul className="navbar-links">
            <li><Link to="/"><FaHome /> Home</Link></li> {/* Home link */}
            <li><Link to="/movies"><FaFilm /> Movies</Link></li> {/* Movies link */}
            <li><Link to="/cart"><FaShoppingCart /> Cart ({cart.length})</Link></li> {/* Cart link */}
            <li><Link to="/about"><FaInfoCircle /> About</Link></li> {/* About link */}
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
          <Routes> {/* Define routes here */}
            <Route path="/" element={<div> {/* Home page content */} <h2>Available Subscriptions</h2>
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
            </div>} />
            <Route path="/movies" element={<div>Movies Page</div>} /> {/* Movies page */}
            <Route path="/cart" element={<Cart cart={cart} />} /> {/* Cart page */}
            <Route path="/about" element={<About />} /> {/* About page */}
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;

