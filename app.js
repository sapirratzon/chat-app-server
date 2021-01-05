const express = require('express');

const app = express();
const PORT = 3535;
var chatRouter = require('./routes/Chat');
var cors = require('cors')

app.use(cors())
app.use('/chat', chatRouter);

app.listen(PORT);

module.exports = app;