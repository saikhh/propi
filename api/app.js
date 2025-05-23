
import express from "express" 
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js" 
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()
app.use(cors({origin:process.env.CLIENT_URL, credentials:true })) 

//allows to send cookie to client side 
app.use(express.json())// allows to send json data
app.use(cookieParser())
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/auth",authRoute)
app.use("/api/test",testRoute)


app.listen(8800,()=>{ 
    console.log("Server is running!")
})