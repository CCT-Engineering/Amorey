// let's...get...stAH-ted

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

// App-wide middleware
app.use(express.json());
app.use(express.urlencoded());

// Static service of assets
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
// app.get('/songs', controllers.getSongs);
// app.post('/songs', controllers.addSong);
// app.get('/songs/:_id', controllers.getSong);

const PORT = process.env.PORT || 3300;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);