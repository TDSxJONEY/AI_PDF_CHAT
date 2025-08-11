// import express from "express";
// import cors from "cors";
// import connectDB from "./config/dBConfig.js"; // Using your import name
// import serverConfig from "./config/serverConfig.js";
// import userRoutes from "./routes/userRoutes.js";
// import documentRoutes from "./routes/documentRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// const app = express();

// // --- MIDDLEWARE SETUP ---

// // 1. CORS MIDDLEWARE - This MUST come first!
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // 2. Other middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // --- ROUTES ---
// app.use("/api/users", userRoutes);
// app.use("/api/docs", documentRoutes);
// app.use("/api/ai", aiRoutes);

// // Health check route
// app.get("/", (req, res) => {
//   res.send("✅ AI StudyOS Backend Running...");
// });


// // --- SERVER INITIALIZATION ---
// const startServer = async () => {
//     try {
//         // Connect to the database first
//         await connectDB();
        
//         // Then, start listening for requests
//         app.listen(serverConfig.PORT, () => {
//             console.log(`🚀 Server started at http://localhost:${serverConfig.PORT}`);
//         });
//     } catch (error) {
//         console.error("❌ Failed to start the server:", error);
//         process.exit(1);
//     }
// };

// startServer();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dBConfig.js";
import serverConfig from "./config/serverConfig.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- TEMPORARY DEBUGGING STEP ---
// This will allow requests from ANY origin to help us diagnose the issue.
app.use(cors({ origin: '*' }));


// 2. Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/ai", aiRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ AI StudyOS Backend Running...");
});


// --- SERVER INITIALIZATION ---
const startServer = async () => {
    try {
        // Connect to the database first
        await connectDB();
        
        // Use the port provided by Render's environment, or our config for local dev
        const PORT = serverConfig.PORT || 8000;
        
        // Then, start listening for requests
        app.listen(PORT, () => {
            console.log(`🚀 Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
};

startServer();
