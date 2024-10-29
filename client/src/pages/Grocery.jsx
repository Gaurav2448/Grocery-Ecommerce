
import { useEffect, useState } from "react";
import './AdminItem.css'; 
import { useCart } from "../store/cart";
import { toast } from "react-toastify";
import './Grocery.css';


export const Grocery = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart,setCart]=useCart();

  const getTotal = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/item/item-count", {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTotal(data);
    } catch (error) {
      console.error("Failed to fetch total items:", error);
    }
  };

  const getAllItemsData = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/item/item-list/${pageNum}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setLoading(false);
      return [];
    }
  };

  const getItemImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/item/item-image/${id}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(`Failed to fetch image for item ${id}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await getAllItemsData(1);
      const updatedItems = await Promise.all(
        itemsData.map(async (item) => {
          const image = await getItemImage(item._id);
          return { ...item, image };
        })
      );
      setItems(updatedItems);
      getTotal();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (page === 1) return;

    const fetchData = async () => {
      const itemsData = await getAllItemsData(page);
      const updatedItems = await Promise.all(
        itemsData.map(async (item) => {
          const image = await getItemImage(item._id);
          return { ...item, image };
        })
      );
      setItems(prevItems => [...prevItems, ...updatedItems]);
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    if (items.length < total) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const addToCart = (item) => {
    const isItemInCart = cart.some(cartItem => cartItem._id === item._id);
    if (!isItemInCart) {
      setCart([...cart, item]);
      localStorage.setItem('cart',JSON.stringify([...cart,item]))
      toast.success("Item added to cart");
    } else {
      toast.info("Item already in cart");
    }
  };


  return (
    <section className="section-services">
      <div className="container admin-items">
        {items.length > 0 ? (
          items.map((curritem, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                {curritem.image ? (
                  <img src={curritem.image} alt={curritem.item_name} />
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="card-content">
                <h2>{curritem.item_name}</h2>
                <p>Price: ₹{curritem.price}</p>
                <div className="cbutton">
                <button className="btn" onClick={() => addToCart(curritem)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading items...</div>
        )}
      </div>
      <div className="m-2 p-3">
        {items.length < total && (
          <button
            className="b1 btn btn-warning"
            onClick={(e) => {
              e.preventDefault();
              loadMore();
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </section>
  );
};
