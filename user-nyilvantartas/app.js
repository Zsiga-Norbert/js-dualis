import express from 'express'
import * as db from "./util/database.js"
import cors from "cors"

const PORT = 3000;
const app = express();
app.use(express.json());

app.use(cors());

app.get("/users", (req, res) => {
    try {
        const users = db.getUsers();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: `${err}` });
    }
})

app.post("/users", (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        if (!emailAddress || !password ) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const savedUser = db.saveUser(emailAddress, password);
        if (savedUser.changes != 1) {
            return res.status(501).json({ message: "User save falied" });
        }
        res.status(201).json({ id: savedUser.lastInsertRowid, emailAddress, password});
    }
    catch (err) {
        res.status(500).json({ message: `${err}` });
    }
})

app.listen(PORT, () => {
    console.log(`Server fut a ${PORT}-on`);
})