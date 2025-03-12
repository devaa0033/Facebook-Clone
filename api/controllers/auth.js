import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import {generateAccessToken, generateRefreshToken} from '../middleware/jwtAuth.js';

export const register = (req, res) => {
                                   
    //CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE username = ?"; 
    
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!");

    //CREATE A NEW USER
    //HASH the PASSWORD

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`, `name`) VALUES (?)" ;

    const values = [
        req.body.username,
        req.body.email,
        hash,
        req.body.name
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
    });

  });
}





//Login User and Generate Access and Refresh Token
export const login = (req, res) => {
   const q = "SELECT * FROM users WHERE username = ?";

   db.query(q, [req.body.username], (err, data) => {
       if(err) return res.status(500).json(err);
       if(data.length === 0) return res.status(404).json("User not found!");

       const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
       );

       if(!checkPassword)
            return res.status(400).json("Wrong credentials!");

      
       const accessToken = generateAccessToken(data[0]);
       const refreshToken = generateRefreshToken(data[0]);

       res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: false
       });
       
       res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: false
       });

       /*const {password, ...others} = data[0];
       res.status(200).json({others, token: accessToken});*/


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
   });
}




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