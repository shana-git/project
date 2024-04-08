require("dotenv").config()


const express=require("express")
const cors =require("cors")
const  mongoose  = require("mongoose")


const corsOptions=require("./config/corsOptions")

const connectDB = require("./config/dbConn")
const verifyJWT = require("./middleware/verifyjwt")

const PORT=process.env.PORT || 1111

const app=express()

connectDB()




app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", require('./routs/authRouter'))

app.use(verifyJWT)

app.use("/api/persons", require('./routs/personRouter'))
app.use("/api/events", require('./routs/eventRouter'))

app.get("/",(req,res)=>{res.send("aaaa")})


mongoose.connection.once('open',()=>{console.log('Connected to MongoDB')
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})

mongoose.connection.on('error',err=>{
    console.log(err)
})
