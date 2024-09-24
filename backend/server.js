const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
require('dotenv').config();
//dotenv.config({ path: "./config.env" }); //import config.env file

const app = express();
app.use(cors());
app.use(express.json());

connectDB();  // Connect to MongoDB

app.use('/api/v1', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
