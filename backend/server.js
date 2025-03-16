import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import userModel from "./models/userModel.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const app = express()
const port= process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

connectDB();

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("api working ")
})

app.listen(port,()=>{
    console.log('server started on http://localhost:4000')
})

//mongodb+srv://priam005:BOFmRsBdZHA7iPkq@cluster0.iqcmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


