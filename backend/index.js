// top level imports
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

// middleware
const app = express();
dotenv.config();

app.use(cors()) // allows the client to connect with our backend server
app.use(express.json());  // allows us to send any json file from client


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

// create a book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?);"
    const values = [
        req.body.title, req.body.desc, req.body.price, req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

// update a book
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ?, WHERE id = ?";

    const values = [
        req.body.title, req.body.desc, req.body.price, req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// delete a book 
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});



// port listener to start server
app.listen(8800, () => {
    console.log("===============================")
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥 Connected to backend ❤️‍🔥❤️‍🔥❤️‍🔥")
    console.log("===============================")
})
