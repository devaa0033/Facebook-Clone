import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Error parsing user data from localStorage", e);
            return null;
        }
    });

    const login = async (inputs) => {
        try {
            const res = await axios.post("/api/auth/login", inputs, { withCredentials: true });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("accessToken", res.data.accessToken);
            setCurrentUser(res.data.user);
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { 
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setCurrentUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};













/*import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("/api/auth/login", inputs, {
          withCredentials: true,  
        });
        setCurrentUser(res.data);
      };
  
      

    useEffect(() => {
        if(currentUser){
            localStorage.setItem("user",JSON.stringify(currentUser));
        }
        else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
};*/


/*import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const login = async (inputs) => {
        try {
            const res = await axios.post("/api/auth/login", inputs, { withCredentials: true });
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log(localStorage.getItem("user"));
            // localStorage.setItem("accessToken", res.data);
            setCurrentUser(res.data);

        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setCurrentUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};*/




  