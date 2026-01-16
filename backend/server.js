const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const dbConfig = require("./Config/db")
dbConfig()
const port = process.env.PORT || 8000;
const cors = require("cors")
const session = require("cookie-session")
const path = require("path")
app.use(express.json())
app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const categoryRoute = require('./Routes/category.route')
const subCategoryRoute = require('./Routes/subcategory.route')
const product = require('./Routes/product.route')
const userRoute = require("./Routes/user.route")

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(session({
    name: "session",
    keys: ["secretKey"],
    maxAge: 60 * 60 * 1000
}));

app.use('/api/category', categoryRoute)
app.use('/api/subcategory', subCategoryRoute)
app.use('/api/product', product)
app.use('/api/user', userRoute)

app.get("/", (req, res) => {
    res.send("Server Starting...");
});
app.listen(port, () => {
    console.log(`Server : http://localhost:${port}`);
}); 