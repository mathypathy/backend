require("dotenv").config();
const cors = require('cors')
const port = process.env.API_PORT_NUMBER || 6000; // 5000 is my default
const mongoDB_Init = require("./MongoDB_Server");
const express = require("express");
const { compareSync } = require("bcryptjs");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// routes
app.use('/api/products',require ('./controllers/productsController'))



// init
mongoDB_Init();
app.listen(port, () =>
  console.log(`API is running at http://localhost:${port}`)
);
