const express=require("express")
const app=express()
const port=3001
const morgan=require("morgan")
const path = require("path")
const cors=require("cors")
const bodyParser=require("body-parser")

app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }

    next()
})

//create default API
app.get("/",(req,res)=>{ //2 parameters request (client), response 
    res.send("Hello Restful API")
})

app.get("/contact", (req, res) => {
  res.json({
    name: "Hello",
    email: "hello@gmail.com",
    phone: "0987773061",
  })
})

app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})

let database=[
    {"BookId":"b1","BookName":"Basic Programming Techniques","Price":70,"Image":"b1.png"},
    {"BookId":"b2","BookName":"Advanced Programming Techniques","Price":100,"Image":"b2.png"},
    {"BookId":"b3","BookName":"Introduction to Machine Learning","Price":200,"Image":"b3.png"},
    {"BookId":"b4","BookName":"Advanced Machine Learning","Price":300,"Image":"b4.png"},
    {"BookId":"b5","BookName":"Basic Robot Programming","Price":250,"Image":"b5.png"},
]


app.get("/books", (req, res) => {
  res.send(database)
})

app.get("/books/:id", cors(), (req, res) =>{
  id=req.params["id"]
  let p=database.find(x=>x.BookId==id)
  res.send(p)
})

