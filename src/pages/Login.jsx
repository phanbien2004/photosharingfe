import { useState } from "react";
import TopBar from "../components/TopBar";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8081/admin/login", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                const user = data.user;
                sessionStorage.setItem("login", "true");
                sessionStorage.setItem("userId", user._id);
                sessionStorage.setItem("firstName", user.first_name);
                window.location.href = "/home";

            } else {
                alert("Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        } catch (err) {
            console.error("Lỗi login", err);
            alert("Đã xảy ra lỗi khi đăng nhập.");
        }
    };

    return (
        <div>
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Paper elevation={3} style={{ padding: 32, minWidth: 300 }}>
                    <Typography variant="h5" gutterBottom>
                        Đăng nhập
                    </Typography>
                    <TextField
                        label="Tên đăng nhập"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        style={{ marginTop: 16 }}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => { window.location.href = "/signup" }}
                        style={{ marginTop: 16 }}
                    >
                        Đăng ký
                    </Button>
                </Paper>
            </Box>
        </div>
    );
}
