import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();

// IMPORTANT: Render will automatically provide a PORT environment variable.
// We must use process.env.PORT to allow Render to connect to our app.
const port = process.env.PORT || 4000;

// Connect to External Services
connectDB();
connectCloudinary();

// --- MIDDLEWARE ---
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ecommerce-shopping-website-1.onrender.com",
  "https://fashion-world-dwpa.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy violation"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// --- API ENDPOINTS ---
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- START SERVER ---
// We add '0.0.0.0' to tell the server to listen on all available network interfaces.
// This is a requirement for Render to detect the open port.
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
