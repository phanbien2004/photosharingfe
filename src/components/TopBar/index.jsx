import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function TopBar() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isShowSection, setIsShowSection] = useState(false);

  useEffect(() => {
    const login = sessionStorage.getItem("login");
    if (login) {
      setIsLogin(true);
      const firstNameTmp = sessionStorage.getItem("firstName");
      setFirstName(firstNameTmp);
    }
  }, []);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" onClick={() => { isLogin ? navigate('/home') : navigate('/login') }} style={{ cursor: "pointer" }}>
          Sharing Photo
        </Typography>
        {isLogin ? (
          <div
            onClick={() => setIsShowSection(!isShowSection)}
            style={{ marginLeft: "auto", cursor: "pointer" }}
          >
            Hi {firstName}
          </div>
        ) : (
          <Link
            to="/login"
            style={{ marginLeft: "auto" }}
            onClick={() => setIsShowSection(!isShowSection)}
          >
            Login
          </Link>
        )}
        {isShowSection && isLogin && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px",
              borderRadius: "6px",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
              zIndex: 9999
            }}
          >
            <div
              style={{ marginBottom: 8, cursor: "pointer" }}
              onClick={() => {
                navigate("/upload_photo")
                setIsLogin(false);
              }}
            >
              Up Photo
            </div>

            <div
              onClick={() => {
                sessionStorage.clear();
                setIsLogin(false);
                navigate('/login');
              }}
              style={{ cursor: "pointer" }}
            >
              Log out
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
