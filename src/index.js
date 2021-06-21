const express = require('express');
const app = express();
require('./mongoose-connection/mongoose')
const tableRouter = require('./router/tableRouter')

app.use(express.json())
app.use(tableRouter)

app.listen(3001, () => {
    console.log("Server started on port 3001")
})