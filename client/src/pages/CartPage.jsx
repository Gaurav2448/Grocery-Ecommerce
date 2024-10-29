import { useCart } from "../store/cart";
import { useAuth } from "../store/auth";
import './CartPage.css'; 
import { toast } from "react-toastify";

export const CartPage = () => {
    const { isLoggedIN } = useAuth();
    const [cart, setCart] = useCart();

    // Function to calculate total price based on item quantities
    const totalPrice = () => {
        try {
            const total = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0); // default quantity to 1
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
            }).format(total);
        } catch (error) {
            console.log("Error calculating total price:", error);
            return "₹0.00";
        }
    };

    // Function to remove an item from the cart
    const removeCartItem = (pid) => {
        try {
            const updatedCart = cart.filter(item => item._id !== pid);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Failed to remove item");
        }
    };

    // Function to handle quantity changes
    const updateQuantity = (pid, increment) => {
        const updatedCart = cart.map(item => {
            if (item._id === pid) {
                const updatedQuantity = (item.quantity || 1) + increment;
                return { ...item, quantity: Math.max(updatedQuantity, 1) }; // prevent quantity from going below 1
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">
                        {cart?.length > 0
                            ? `You have ${cart.length} items in your cart${isLoggedIN ? '' : ', please log in'}`
                            : 'Your Cart is Empty'}
                    </h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {cart?.map((item, index) => (
                            <div className="row cart-item" key={index}>
                                <div className="col-md-3">
                                    <img src={item.image} alt={item.item_name} className="img-fluid" />
                                </div>
                                <div className="col-md-9">
                                    <h5>{item.item_name}</h5>
                                    <p>Price: ₹{item.price}</p>
                                    <div className="quantity-control">
                                        <button className="btn-quantity" onClick={() => updateQuantity(item._id, -1)}>-</button>
                                        <span className="quantity">{item.quantity || 1}</span>
                                        <button className="btn-quantity" onClick={() => updateQuantity(item._id, 1)}>+</button>
                                    </div>
                                    <button className="btn-remove" onClick={() => removeCartItem(item._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Conditionally render the cart summary */}
                    {cart.length > 0 && (
                        <div className="col-md-3 cart-summary">
                            <h2>Cart Summary</h2>
                            <hr />
                            <h3>Total: {totalPrice()}</h3>
                            <button className="btn-checkout">Proceed to Checkout</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
