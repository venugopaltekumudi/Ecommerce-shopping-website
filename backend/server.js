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
const port = process.env.PORT || 4000;

// Connect to External Services
connectDB();
connectCloudinary();

// --- MIDDLEWARE ---
app.use(express.json());

// FIXED CORS: Added localhost to the allowed list so you can work locally
const allowedOrigins = [
  "http://localhost:5173", // Frontend Local
  "http://localhost:5174", // Admin Local (usually 5174)
  "https://ecommerce-shopping-website-1.onrender.com", // Frontend Deployed
  "https://fashion-world-dwpa.onrender.com", // Admin Deployed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
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

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
