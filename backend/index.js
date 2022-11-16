// top level imports
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

// middleware
const app = express();
dotenv.config();
// allows us to send any json file from client
app.use(express.json()); 


// db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SECRET,
    database: "test",
  });
 
// welcome route
app.get("/", (req, res) => {
    res.json("hello"); 
});


// get all books
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

// post a book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?);"
    const values = [
        req.body.title, req.body.desc, req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfuully");
    });
})

// port listener to start server
app.listen(8800, () => {
    console.log("===============================")
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥 Connected to backend ❤️‍🔥❤️‍🔥❤️‍🔥")
    console.log("===============================")
})



app.listen(8000, () => {
    console.log("Connected to backend.");
  });
