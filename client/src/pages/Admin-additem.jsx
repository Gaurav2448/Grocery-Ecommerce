import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './additem.css';

export const AdminAddItem = () => {
    const [item, setItem] = useState({
        item_name: "",
        price: ""
    });
    const [photo, setPhoto] = useState(null);
    const { authorization } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setItem({
            ...item, [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(item);

        const formData = new FormData();
        formData.append("item_name", item.item_name);
        formData.append("price", item.price);
        if (photo) {
            formData.append("image", photo);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/admin/additem`, {
                method: "POST",
                headers: {
                    "Authorization": authorization,
                },
                body: formData,
            });

            const res_data = await response.json();
            console.log("response from server", res_data);
            if (response.ok) {
                setItem({
                    item_name: "",
                    price: ""
                });
                setPhoto(null);
                navigate("/admin/items");
            } else {
                toast(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            <div className="section-reg">
                <div className="container grid grid-two-cols">
                    <div className="registration-img">
                        <img src="/images/b1.png" alt="register img" width="500" height="500"></img>
                    </div>
                    <div className="Add Item">
                        <h1 className="main-heading mb-3">Add Item</h1>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="item_name">Item Name</label>
                                <br />
                                <input
                                    type="text"
                                    name="item_name"
                                    placeholder="Item Name"
                                    id="item_name"
                                    required
                                    autoComplete="off"
                                    value={item.item_name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <br />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    id="price"
                                    required
                                    autoComplete="off"
                                    value={item.price}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <br />
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};





