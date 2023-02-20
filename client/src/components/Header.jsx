import React, { useContext, useState } from "react";
import {  Button } from "@mui/material";
import "./header.css";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buttonSwitch, setButtonSwitch] = useState(false); 
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const goDash = () => {
    navigate("/dash");
  };

  const goError = () => {
    navigate("*");
  };

  return (
    <>
      <header style={{ display:'flex', justifyContent:'space-around'  }}>

      { logindata.ValidUserOne ?
      
       <nav>
          <NavLink to="/" style={{ textDecoration: "none" }}>
     <Button
     variant='contained'
     >  
      { logindata.ValidUserOne  ? "Home" : '' }
      </Button>
          </NavLink>

          <Button
          style={{marginLeft: '30px' }}
          variant='contained'
            onClick={() => {
              goDash();
              handleClose();
            }}
          >
            {logindata.ValidUserOne ? "Profile" : ""}
          </Button>

          <Button
          style={{marginLeft: '30px', }}
          variant='contained'
            onClick={() => {
              logoutuser();
              handleClose();
            }}
          >
            {" "}
            {logindata.ValidUserOne ? "Logout" : ""}
          </Button>
        </nav>:''
        }
      </header>
    </>
  );
};

export default Header;
