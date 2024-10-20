import React from 'react';

const Cart = ({ cart, updateQuantity, removeItem }) => {
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>
                Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  min="1"
                />
              </p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>

      {cart.length > 0 && (
        <div className="checkout-section">
          <button onClick={() => alert("Proceeding to Checkout!")}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
