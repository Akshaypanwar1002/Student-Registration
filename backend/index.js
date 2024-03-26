const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require("./routes/student.routes");
const dbConnection = require('./DB/db');
dbConnection()

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/", studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
