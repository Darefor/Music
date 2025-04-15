import express from "express"
import dotenv from "dotenv"
import { connectToDB } from "./config/db.js"
import User from "./models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import cors from "cors"
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"
import Biograf from "./models/biograf.model.js"
import Music from "./models/music.model.js"
import multer from "multer"; 
import fs from "fs";
import path from "path";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

// milewares
app.use(cors({origin: "https://music-43ma.onrender.com", credentials: true }))
app.use(express.json({limit:"20mb"}))
app.use(cookieParser());


//Sign up
app.post("/api/signup", async(req, res) => {
    const {username, password} = req.body
        
    try{
        if(!username || !password){
            throw new Error("All fields are required")
        }

        const usernameExists = await User.findOne({username})

        if(usernameExists) return res.status(400).json({messange: "User is taken try another name."})


        //Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10)
        const userDoc = await User.create({
            username,
            password: hashedPassword,
        })

        //JWT
        if(userDoc){
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
                expiresIn: "1d",
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })
        }



        return res
            .status(200)
            .json({user: userDoc, message: "User created successfully"})
    } catch(error){
        res.status(400).json({message: error.message})
    }
})
//Login
app.post("/api/login", async(req, res) => {
    const {username, password} = req.body

    try{
        const userDoc = await User.findOne({username})

        if(!userDoc) return res.status(400).json({ message: "Invalid crdentials"})

        const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password)

        if(!isPasswordValid) return res.status(400).json({ message: "Invalid crdentials"})

        //JWT
        if(userDoc){
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
                expiresIn: "1d",
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })
        }

        
        return res
            .status(200)
            .json({user: userDoc, message: "Loggen in successfully"})

    } catch(error){
        res.status(400).json({message: error.message})
    }
})

app.get("/api/fetch-user", async (req, res) => {
    const { token } = req.cookies
    if(!token) return res.status(401).json({message: "No token provided."})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) return res.status(401).json({message: "Invalid token."})

        const userDoc = await User.findById(decoded.id).select("-password")

        if(!userDoc) return res.status(400).json({message: "User not found."})

        res.status(200).json({user: userDoc})
    }catch (error) {
        res.status(400).json({message: "error.message"})
    }
})

app.post("/api/logout", async(req, res) => {
    res.clearCookie("token")
    res.status(200).json({message: "Logged out succcessfully."})
})

// ========= Biograf Functionalities ================
app.post("/api/add-biograf", async (req, res) => {
    const {image, title, music, description} = req.body
    const {token} = req.cookies
    if(!token) {
        return res.status(401).json({message: "No token provie"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({message: "Invalid token"})
        }
        //Image proces

        const imageResponse = await cloudinary.uploader.upload(image, {
            folder: "/biograf",
        })

        console.log("Image Response: ", imageResponse)

        const userDoc = await User.findById(decoded.id).select("-password")

        const musics = await Music.find()

        const biograf = await Biograf.create({
            image: imageResponse.secure_url,
            title,
            music,
            description
        })
        return res.status(200).json({biograf, message: "Biograf added successfully"})
    } catch (error){
        res.status(400).json({message:error.message})
    }
})
app.delete("/api/delete-biograf/:id", async (req, res) => {
    const {id} = req.params
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: "No token ptovider"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "invalid token,"})
        }

        const biograf = await Biograf.findById(id)
        if (!biograf) {
            return res.status(404).json({ message: "Biograf not found" })
        }


        //Delete the image first
        const parts = biograf.image.split("/")
        const fileName = parts[parts.length - 1]
        const imageId = fileName.split(".")[0]

        cloudinary.uploader
            .destroy(`biograf/${imageId}`)
            .then((result) => console.log("result", result))

        // Delete the data from db
        await Biograf.findByIdAndDelete(id)
        return res.status(200).json({message: "Book deleted successfully."})

    }catch(error){}
})

// ========= Music Functionalities ================
app.post("/api/add-music", upload.single("music"), async (req, res) => {
    const { title } = req.body
    const { token } = req.cookies
    const musicFile = req.file

    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }
    if (!musicFile) {
        return res.status(400).json({ message: "No music file uploaded" })
    }

    try {
        // Перевірка токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" })
        }

        // Завантаження файлу в Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "video", folder: "music" },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            );
            uploadStream.end(musicFile.buffer)
        });

        // Збереження в базі
        const newMusic = await Music.create({
            title,
            link: result.secure_url, // Посилання на Cloudinary
        });

        return res.status(200).json({ music: newMusic, message: "Music added successfully" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
});




app.get("/api/music-files", async (req, res) => {
    const musicDir = path.join(__dirname, "public/music");
    try {
        const files = await fs.promises.readdir(musicDir);
        res.json({ files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка при зчитуванні файлів" });
    }
});




app.get("/api/musics", async (req, res) => {
    try {
        const musics = await Music.find();
        return res.status(200).json({ musics });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




app.get("/api/fetch-biografs", async (req, res) => {
    try {
        const biografs = await Biograf.find().sort({createdAt: -1});
        return res.status(200).json({ biografs });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get("/api/fetch-biograf/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const biograf = await Biograf.findById(id);
        return res.status(200).json({ biograf });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.post("/api/get-music", async (req, res) => {
    const { musicIds } = req.body; // Отримуємо масив id
    try {
        const musicList = await Music.find({ _id: { $in: musicIds } }); // Знаходимо всі пісні
        return res.status(200).json(musicList);
    } catch (error) {
        console.error("Error fetching music:", error);
        return res.status(500).json({ message: "Error fetching music" })
    }
})


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
  }

app.listen(PORT, async() => {
    await connectToDB()
    console.log("Sever starded at PORT: ", PORT)
})