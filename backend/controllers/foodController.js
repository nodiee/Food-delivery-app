import foodModel from "../models/foodModel.js";
import fs from 'fs';

// ✅ Add Food
const addFood = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // Construct image filename
        const imageFilename = `${Date.now()}-${req.file.filename}`;

        // Create new food item
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageFilename
        });

        // Save food to database
        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });

    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Server error, food not added" });
    }
};

// ✅ Get All Food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });

    } catch (error) {
        console.error("Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Server error, could not fetch food list" });
    }
};

// ✅ Remove Food
const removeFood = async (req, res) => {
    try {
        // Find food by ID
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Delete image from uploads folder if exists
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }

        // Remove food from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Server error, food not removed" });
    }
};

export { addFood, listFood, removeFood };
