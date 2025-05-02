const express = require('express');
const personasRoute = require("./routes/personas");

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(personasRoute);
app.use('/ask', require('./routes/ask'));

app.listen(3001, () => console.log('Server running on http://localhost:3001'));