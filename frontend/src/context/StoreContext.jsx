import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Fetch the list of food items
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data from backend if token is present
    const loadCartData = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${url}/api/cart/get`, { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Calculate total amount of items in cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // Load food items and cart data on mount
    useEffect(() => {
        fetchFoodList();
        if (token) {
            loadCartData();
        }
    }, [token]); // Re-fetch cart data if token changes

    return (
        <StoreContext.Provider
            value={{
                food_list,
                cartItems,
                setCartItems,
                addToCart,
                removeFromCart,
                getTotalCartAmount,
                url,
                token,
                setToken,
            }}
        >
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;