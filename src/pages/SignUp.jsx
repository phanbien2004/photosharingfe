import TopBar from "../components/TopBar";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";


export default function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setfullname] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [occupation, setOccupation] = useState("");

    const hadleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8081/admin/signUp', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, fullname, location, description, occupation })
            })
            const data = await response.json();
            const user = data.user
            sessionStorage.setItem("login", "true");
            sessionStorage.setItem("userId", user._id);
            sessionStorage.setItem("firstName", user.first_name);
            window.location.href = "/home";
        } catch (e) {
            console.log("Loi fetchSignUp: ", e);
        }
    }

    return (
        <div>
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                style={{ marginTop: 100 }}
            >
                <Paper elevation={3} style={{ padding: 32, minWidth: 300 }}>
                    <Typography variant="h5" gutterBottom>
                        Đăng ký
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
                    <TextField
                        label="Họ tên"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                    />
                    <TextField
                        label="Nơi ở"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <TextField
                        label="Mô tả"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Nghề nghiệp"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 16 }}
                        onClick={hadleSignUp}
                    >
                        Đăng ký
                    </Button>
                </Paper>
            </Box>
        </div>
    )
}