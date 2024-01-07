const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id
app.get("/api/v1/products/:id", (req, res) => {
  const productId = parseInt(req.params.id); // Extracting the product ID from the request

  // Searching for the product in the products array
  const foundProduct = products.find(product => product.id === productId);

  if (foundProduct) {
    // If the product is found, return it with a 200 status code
    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: {
        product: foundProduct
      }
    });
  } else {
    // If the product is not found, return a 404 status code with a message
    return res.status(404).json({
      status: "failed",
      message: "Product not found!"
    });
  }
});


module.exports = app;
