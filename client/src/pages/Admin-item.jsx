import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import './AdminItem.css'; 

export const AdminItem = () => {
  const [items, setItems] = useState([]);
  const { authorization } = useAuth();

  const getAllItemsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/item/getitems", {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch items:", error);
      return [];
    }
  };

  const getItemImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/item/item-image/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
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

  const deleteitem=async (id)=>{
    try {
        const response=await fetch(`http://localhost:5000/api/item/deleteitem/${id}`,
            {
                method:"DELETE",
                headers:{
                    Authorization:authorization,
                },
            }
           
        );
        const data=await response.json();
        console.log(`users after delete ${data}`);
        if(response.ok){
            getAllItemsData();
        }
    } catch (error) {
        console.log(error);
    }
   
}

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await getAllItemsData();
      const updatedItems = await Promise.all(
        itemsData.map(async (item) => {
          const image = await getItemImage(item._id);
          return { ...item, image };
        })
      );
      setItems(updatedItems);
    };
    fetchData();
  }, [authorization, getAllItemsData, getItemImage]);

  return (
    <section className="admin-items-section">
      <div className="container">
        <h1>Items Data</h1>
      </div>
      <div className="container admin-items">
        {items.length > 0 ? (
          items.map((curritem, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                {curritem.image ? (
                  <img src={curritem.image} alt={curritem.item_name} />
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="card-content">
                <h2>{curritem.item_name}</h2>
                <p>Price: ₹{curritem.price}</p>
                <div className="card-actions">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete" onClick={()=>deleteitem(curritem._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading items...</div>
        )}
      </div>
    </section>
  );
};



