const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ejs configuration
app.set("view engine", "ejs");
app.set("views", "./views");

// sample product data
const products = [
  {
    id: 1,
    name: "Product A",
    price: 100,
    description: "Description for Product A",
  },
  {
    id: 2,
    name: "Product B",
    price: 150,
    description: "Description for Product B",
  },
  {
    id: 3,
    name: "Product C",
    price: 200,
    description: "Description for Product C",
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Product List", products });
});

// Dynamic route for product details
app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.render("product", { title: "Product Details", product });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
