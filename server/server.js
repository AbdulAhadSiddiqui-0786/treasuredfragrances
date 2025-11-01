require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./src/middleware/rateLimiter');
const connectDB = require('./src/config/db');
const { deleteImage } = require('./src/routes/upload.js');

// ROUTE IMPORTS
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cart');
const authRoutes = require('./src/routes/auth');

const { createRouteHandler } = require('uploadthing/express');
const { uploadRouter } = require('./src/uploadthing.js');

// MIDDLEWARE IMPORTS
const authMiddleware = require('./src/middleware/authMiddleware'); 

const app = express();
const PORT = process.env.PORT || 5000;

// connect to MongoDB
connectDB();

// global middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // your local frontend
      "https://treasuredfragrances.in",  // your production frontend
    ],
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(rateLimiter);

const uploadThingHandler = createRouteHandler({
  router: uploadRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/products', productRoutes);
app.post('/api/upload/delete', deleteImage);
app.use(
  "/api/uploadthing",
  uploadThingHandler
);

// --- ERROR HANDLERS ---
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));