import { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types"; 

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Define PropTypes for CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the CartContext
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
