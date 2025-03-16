import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // ✅ Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // ✅ Ensure cartData is always an object

        // ✅ Increase quantity or add new item
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added to cart", cartData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // ✅ Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // ✅ Ensure cartData is always an object

        // ✅ Decrease quantity if item exists
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // ✅ Remove item if quantity becomes 0
        if (cartData[req.body.itemId] === 0) {
            delete cartData[req.body.itemId];
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

        res.json({ success: true, message: "Removed from cart", cartData });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // ✅ Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // ✅ Ensure cartData is always an object

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Ensure proper export of functions
export { addToCart, removeFromCart, getCart };