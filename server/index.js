require("dotenv").config();
const express = require("express");
const app = express();
const user = require("../server/models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("db-connected"))
    .catch((err) => console.log(err));
//routes
app.post("/sign-up", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: "user already existed"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const User = await user.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            msg: "user created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "server side error",
        })
    }
});
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                msg: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        )
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "user not found"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "user logedin"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "server-side error occured"
        })
    }
})







app.listen(3000, () => {
    console.log("Server is running there");
});