import foodModel from "../models/Food.model.js";
// import fs from "fs";

// add food item

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({message:"no file"})
  }

  let image_filename = `${req.file.filename}`
  console.log(req.file)
  console.log(req.body);
  console.log(req.file);


  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image : image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    //  console.log();
    res.json({ success: false, message: "Error" + error.message });
  }
};

export { addFood };
