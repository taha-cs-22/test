import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/FoodRoute.js"
import userRouter from "./routes/UserRoute.js"
import jwt from 'jsonwebtoken'
import "dotenv/config";



// app config

const app = express()
const port = 5000

// middleware
app.use(express.json())
app.use(cors())

// db connection
 connectDB()

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images" , express.static('uploads'))
app.use("/api/user" , userRouter)

app.get("/" , (req , res) => {
    res.send("API working")
})

app.listen(port , () => {
    console.log(`Server started on http://localhost:${port}`)
})