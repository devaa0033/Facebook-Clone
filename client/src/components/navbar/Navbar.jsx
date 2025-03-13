import "./Navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
      await logout();
      navigate("/");
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Facebook</span>
        </Link>
        <HomeOutlinedIcon />
        <WbSunnyOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {currentUser ? (
            <>
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </>
          ) : (
            <>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_x6NwUWccs5uiI2OVZdtWRFfDMNbVbhkn6g925096hRD8KP1S5kqEYw4dDp11-EERhw&usqp=CAU" alt="" />
              <span>Your Name</span>
            </>
          ) }
        </div>
      </div>

      <div className="LoginMenu">
     { currentUser ? (
      <button onClick={handleLogout}>Logout</button>
     ) : (
      <>
        <Link to="/login">
            <button>Login</button>
        </Link>
        <Link to="/register">
            <button>register</button>
        </Link>
      </>
     )}
    </div>

</div>
  );
};

export default Navbar;
