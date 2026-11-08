const express = require('express');
const app = express();
const port = 3002;

const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
const fs = require('fs');
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
app.use(cors())
const bodyParser=require("body-parser")
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})

app.get("/",(req,res)=>{
    res.send("This Web server is processed for MongoDB")
})


// câu lệnh truy vấn vào csdl MongoDB 
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb+srv://hihubebe_db_user:hNk0M7KoveZGsfev@fashion.fqttwbw.mongodb.net");
client.connect();
database = client.db("Fashion_Data");      
fashionCollection = database.collection("Fashion");

app.get("/fashions", cors(), async (req, res) => {   
    try {
        const result = await fashionCollection.find({}).sort({ IdF: 1 }).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/fashions/slug/:slug", cors(), async (req, res) => {
    try {
        const slug = req.params["slug"];
        // 1. Try finding by exact slug
        let item = await fashionCollection.findOne({ slug: slug });
        
        // 2. Try extracting IdF from slug (e.g., ...-f1 or ...-p1 or -1)
        if (!item) {
            const match = slug.match(/-(?:f|p)?(\d+)$/i);
            if (match) {
                const idf = parseInt(match[1], 10);
                item = await fashionCollection.findOne({ IdF: idf });
            }
        }
        
        if (item) {
            res.send(item);
        } else {
            res.status(404).send({ error: "Fashion not found with slug " + slug });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/fashions/:id", cors(), async (req, res) => {
    try {
        const param = req.params["id"];
        let item = null;

        // 1. Check if numeric IdF
        if (!isNaN(Number(param))) {
            item = await fashionCollection.findOne({ IdF: Number(param) });
        }

        // 2. Check if valid 24-character hex ObjectId
        if (!item && ObjectId.isValid(param) && String(new ObjectId(param)) === param) {
            item = await fashionCollection.findOne({ _id: new ObjectId(param) });
        }

        // 3. Check if matching slug
        if (!item) {
            item = await fashionCollection.findOne({ slug: param });
        }

        // 4. Try extracting IdF from slug format
        if (!item) {
            const match = param.match(/-(?:f|p)?(\d+)$/i);
            if (match) {
                const idf = parseInt(match[1], 10);
                item = await fashionCollection.findOne({ IdF: idf });
            }
        }

        if (item) {
            res.send(item);
        } else {
            res.status(404).send({ error: "Fashion not found with id/slug " + param });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


