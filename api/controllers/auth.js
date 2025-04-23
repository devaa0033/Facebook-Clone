import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import {generateAccessToken, generateRefreshToken} from '../middleware/jwtAuth.js';

export const register = async (req, res) => {
    try {
        // Check if user already exists
        const [existingUser] = await db.execute(
            "SELECT * FROM users WHERE username = ?",
            [req.body.username]
        );

        if (existingUser.length > 0) {
            return res.status(409).json("User already exists!");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Insert new user
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.name,
            new Date()
        ];

        await db.execute(
            "INSERT INTO users(`username`, `email`, `password`, `name`, `joinDate`) VALUES (?, ?, ?, ?, ?)",
            values
        );

        return res.status(200).json("User has been created.");
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json("Something went wrong");
    }
};





//Login User and Generate Access and Refresh Token
export const login = async (req, res) => {
    
    const q = "SELECT * FROM users WHERE username = ?";

    try {
        const [data] = await db.execute(q, [req.body.username]);

        if (data.length === 0) {
            return res.status(404).json("User not found!");
        }

        const checkPassword = await bcrypt.compare(req.body.password, data[0].password);
        if (!checkPassword) {
            return res.status(400).json("Wrong credentials!");
        }

        const accessToken = generateAccessToken(data[0]);
        const refreshToken = generateRefreshToken(data[0]);
      
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',

        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
        });

        res.status(200).json({
            user: {
                id: data[0].id,
                username: data[0].username,
                email: data[0].email,
                profilePic: data[0].profilePic,
                name: data[0].name
            },
            accessToken,
        });

    } catch (err) {
        console.error("Database or server error:", err);
        res.status(500).json("Internal server error");
    }
};




export const logout = (req, res) => {
    const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json("No token provided");
    }
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'None',
        secure: false
    });
    res.status(200).json("User has been logged out!");
}




/*{
    "username" : "PriyaVerma",
    "email" : "priya.verma@gmail.com",
    "password" : "priya456",
    "name" : "Priya"
}*/

/**
AnanyaKumar
ananya505


VikramMehta
vikram404


test1
12345678
 */