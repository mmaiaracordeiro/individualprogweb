const express = require("express")
const bodyParser = require("body-parser")
const bookRoutes = require("./routes/books.js")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use("/books", bookRoutes)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})