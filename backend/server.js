import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// INFO: Create express app mern stack
const app = express();
const port = process.env.PORT || 4000;

// Connect to External Services
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());

// Updated CORS to allow both your Admin and Frontend sites
app.use(
  cors({
    origin: [
      "https://ecommerce-shopping-website-1.onrender.com",
      "https://fashion-world-dwpa.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
