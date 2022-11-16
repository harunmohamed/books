// top level imports
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

// middleware
const app = express();
dotenv.config();
app.use(express.json());


// db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SECRET,
    database: "test",
  });
 

app.get("/", (req, res) => {
    res.json("hello"); 
});

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

// port listener to start server
app.listen(8800, () => {
    console.log("===============================")
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥 Connected to backend ❤️‍🔥❤️‍🔥❤️‍🔥")
    console.log("===============================")
})



app.listen(8000, () => {
    console.log("Connected to backend.");
  });
